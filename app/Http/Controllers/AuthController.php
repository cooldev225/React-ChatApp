<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Contracts\Encryption\DecryptException;
use App\Http\Controllers\Auth\RegisterController;
use Stevebauman\Location\Facades\Location;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\Helper\MailHelper;

use App\Models\Session;
use App\Models\User;
use App\Models\National;
use App\Datas\MailData;
use App\Models\LastLogin;
class AuthController extends Controller
{
    public function __invoke(Request $request)
    {
        if (Auth::check()&&Auth::user()->is_admin) return redirect()->intended('dashboard');
        else return view('frontend.auth.login', ['page_title' => 'Login']);
    }

    protected function selectAuthType(Request $request)
    {
        $login = $request->input('email');
        $fieldType = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
        $request->merge([$fieldType => $login]);
        switch ($fieldType)
        {
            case 'email':
                return true;
                break;
            case 'username':
                return false;
                break;
        }
    }

    public function register(Request $request)
    {
        $email = $request->input('email');
        if ($email == null)
            return view('frontend.auth.register',['page_title' => 'Register']);
        
        $this->validate($request, [
            'username' => 'required|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required'
        ], [
            'username.required' => 'The username field is required.',
            'username.unique' => 'The username already exists.',
            'email.required' => 'The email field is required.',
            'email.email' => 'The email format is incorrect.',
            'email.unique' => ' The email already exists.',
            'password.required' => 'The password field is required',
        ]);

        $password=$request->input('password');//Str::random(7);
        $cryptpass=Hash::make($password);
        $email=$request->input('email');
        $token=Crypt::encryptString($email.'###'.$password);  
        $user = User::create([
            'username' => $request->input('username'),
            'email' => $email,
            'password' => $cryptpass,
            'remember_token'=>$token
        ]);
        return redirect('/login');
    }

    public function login(Request $request)
    {
        if ($request->input('email') == '')
            return array(
                'message' => 'Please input email or username',
                'loggedin' => false
            );
        if ($request->input('password') == '')
            return array(
                'message' => 'Please input password',
                'loggedin' => false
            );
        $validator = $this->selectAuthType($request) ?
            $request->validate([
                'email'     => 'required',
                'password'  => 'required'
            ])
            :
            $request->validate([
                'username'  => 'required',
                'password'  => 'required'
            ])
        ;
        
        if (Auth::attempt($validator))
        {
            if(auth::check()){
                $login = Session::select()->where('user_id', Auth::id())->get();
                $user = Auth::user();
                $user->remember_token = Crypt::encryptString("{$user->email}###{$validator['password']}");
                $user->logins = $user->logins + 1;
                $user->logout = 0;
                $user->save();

                $session = new Session;
                $session->id = session()->getId();
                $session->user_id = Auth::id();
                $session->ip_address = $this->get_client_ip();
                $session->user_agent = '';
                $session->payload = 'login';
                $session->last_activity = 1;
                $session->save();
            }
            $request->session()->regenerate();
            $row = new LastLogin;
            $row->userId = Auth::id();
            $row->time = date("Y-m-d H:i:s");
            $row->save();
            return array(
                'message'=> 'success',
                'loggedin'=> true,
                'currentUsername' => User::where('id', $row->userId)->get('username')
            );
        }
        else
        {
            $msg='error';
            if(!User::select()->where('email',$request->input('email'))->count())
                $msg='The email is not exist.';
            else $msg='Password is wrong.';
            return array(
                'message'=> $msg,
                'loggedin'=> false,
            );  
        }
    }

    public function logout(Request $request)
    {
        Session::select()->where('user_id',Auth::id())->delete();
        $row = Auth::user();
        $row->logout = 1;
        $row->save();
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login');
    }

    public function forgot(Request $request)
    {
        $email = $request->input('email');
        if($email==null)return view('frontend.auth.forgot',['page_title' => 'Forgot']);
        $_user = User::where('email', $email)
            ->select('id as userId', 'email as userEmail', 'username as userName', 'firstName', 'lastName')
            ->get();
        if($_user && count($_user) === 1)
        {
            $user = $_user[0];
            $login = Session::select()->where('user_id', $user->userId)->get();
            if(count($login))$login[0]->delete();
            $newPassword = Str::random(8);
            $_newPassword = Hash::make($newPassword);

            User::where('id', $user->userId)->update(['password'=>$_newPassword]);

            $mailData = new MailData();
            $mailData->template='temps.password_changed';
            $mailData->fromEmail = config('mail.from.address');
            $mailData->userName = $user->userName;
            $mailData->toEmail = $email;
            $mailData->subject = 'OJOChat - Password Reset';
            $mailData->mailType = 'RESET_LINK_TYPE';
            $mailData->content = $newPassword;

            Mail::to($mailData->toEmail)->send(new MailHelper($mailData));

            return redirect()->intended('login');
        }
        else{
            return view('frontend.auth.login', ['page_title' => 'Login']);
        }
    }

    public function get_client_ip() {
        $ipaddress = '';
        if (isset($_SERVER['HTTP_CLIENT_IP']))
            $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
        else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
        else if(isset($_SERVER['HTTP_X_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
        else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
        else if(isset($_SERVER['HTTP_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_FORWARDED'];
        else

        if(isset($_SERVER['REMOTE_ADDR']))
            $ipaddress = $_SERVER['REMOTE_ADDR'];

        else
            $ipaddress = 'UNKNOWN';

        return $ipaddress;
    }

    public static function getRandomString(){
		$res="";
		//$alpha=explode('::','ABCDEFGHJKLMNOPQRSTUVWXYZ::abcdefghijklmnopqrstuvwxyz::0123456789::!~@#%^&*()_+-[];::ABCWX];:rstDEMJ#%^&*()KLZabmnoPQRSTUcpqI6789!~@deyz012345NYFG_+-[OfghijklVuvwxH');
		$alpha=explode('::','ABCDEFGHJKLMNOPQRSTUVWXYZ::abcdefghijklmnopqrstuvwxyz::0123456789::KLZabmnoPQRSTU::cpqI6789uvwxH::879JK7822::qwe23EW3::9032JJFFDR::Nknsdf3452::890SAFqweqwsdf23ewfdf234rfdfst');
        $d=mktime(date('H'),date('i'),date('s'),date('m'),date('d'),date('Y'));
		$exp=explode(',','0,2,4,1,3,3,0,4,2,1');
		for($i=0;$i<10;$i++)$inx[$i]=0;
		for($i=0;$i<10;$i++){
			while(1){
				$p=rand(1,$d%rand(1,100))%10;
				if(!$inx[$p]){
					$r=rand(1,$d)%strlen($alpha[$exp[$i]]);
					$pos[$p]=substr($alpha[$exp[$i]],$r,1);
					$inx[$p]=1;
					break;
				}
			}
		}
		for($i=0;$i<10;$i++)$res.=$pos[$i];
		return $res;
	}
}
