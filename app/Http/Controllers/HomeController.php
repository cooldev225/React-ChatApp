<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Crypt;
use Stevebauman\Location\Facades\Location;
use Illuminate\Support\Facades\Auth;

use App\Models\Country;
use App\Models\State;
use App\Models\City;
use App\Models\User;
use App\Models\Message;
use App\Models\Contact;
class HomeController extends Controller
{
    public function __construct()
    {
        if (!Auth::check()) return view('frontend.auth.login', ['page_title' => 'Login']);
    }
    public function index(Request $request)
    {
        return view('frontend.home',[
//            'announcements'=>$anns
        ]);
    }
    public function getContactList(Request $request)
    {
        $id=Auth::id();
        $contacts=Contact::where('user_id',$id)->get();
        for($i=0;$i<count($contacts);$i++){
            $msg=Message::where('sender',$contacts[$i]->contact_id)
                ->orWhere('recipient',$contacts[$i]->contact_id);
            $contacts[$i]['message']=$msg->count()?$msg->orderBy('created_at','desc')->get()[0]:'';
        }
        return $contacts;
    } 
}
