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

    public function addContactItem(Request $request)
    {
        $id=Auth::id();
        
        $newContactInfo = User::where('email', $request->input('email'))->get();
        $contactIds = Contact::where('user_id', Auth::id())->get();
        foreach($contactIds as $contactId) {
            if ($newContactInfo[0]->id == $contactId->contact_id)
                return array(
                    'message' => 'This email exists in Contact',
                    'insertion' => false
                );
        }
        if (!count($newContactInfo)) 
            return array(
                'message' => 'This email doesnot register',
                'insertion' => false
            );
        $newContact = new Contact;
        $newContact->user_id = $id;
        $newContact->contact_id = $newContactInfo[0]->id;
        $newContact->save();
        return array(
            'message' => 'Save Successfully',
            'insertion' => true,
            'data' => $newContactInfo[0],
        );
    }

    public function getContactList(Request $request)
    {
        $id = Auth::id();
        $contacts = Contact::where('user_id',$id)->get();
        for ($i = 0; $i < count($contacts); $i++) {
            $msg = Message::where('sender',$contacts[$i]->contact_id)
                ->orWhere('recipient',$contacts[$i]->contact_id);
            $contacts[$i]['message'] = $msg->count() ? $msg->orderBy('created_at','desc')->get()[0] : '';
            $contacts[$i]['username'] = User::where('id', $contacts[$i]->contact_id)->get()[0]->username;
        }
        return $contacts;
    }
    
    public function getChatData(Request $request)
    {
        $id = Auth::id();
        $contactIds = $request->input('currentContactId');
        $contactIds = $contactIds == 'undefined' ? Contact::where('user_id', $id)->get('contact_id') : array(array('contact_id' => $contactIds));
        // $contactIds = array(array('contact_id' => $contactIds));
        $result = array();
        foreach ($contactIds as $contactId) {
            // $msg = Message::where(function($query) use($id, $contactId) {
            //     $query->where('sender', $id)
            //         ->where('recipient', $contactId['contact_id']);
            // })->orWhere(function($query) use($id, $contactId) {
            //     $query->where('recipient', $id)
            //         ->where('sender', $contactId['contact_id']);
            // });
            $msg = Message::whereRaw("sender = ".$id." AND recipient = ".$contactId['contact_id'])
            ->orWhereRaw("sender = ".$contactId['contact_id']." AND recipient = ".$id);
            $message = $msg->count() ? $msg->orderBy('created_at')->get() : '';
            $contactor = User::where('id', $contactId['contact_id'])->get()[0];  
            $data = array('message' => $message, 'contactor' => $contactor);
            array_push($result, $data);
        }
        return count($result) ? $result[0] : array('message' =>'no data');
    }

    public function sendMessage(Request $request)
    {
        $id = Auth::id();
        $contactId = $request->input('currentContactId');
        $content = $request->input('content');
        $newMessage = new Message;
        $newMessage->sender = $id;
        $newMessage->recipient = $contactId;
        $newMessage->content = $content;
        $newMessage->save();
        return array(
            'message' => 'Save Successfully',
            'insertion' => true,
        );
    }

    public function saveProfileInfo(Request $request)
    {
        $id = Auth::id();
        $username = $request->input('username');
        $location = $request->input('location');
        $user = User::find($id);
        $user->username = $username;
        $user->location = $location;
        $user->save();
        return array(
            'message' => 'Save Successfully',
            'update' => true,
        );
    }
}
