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
use App\Models\PhotoRequest;

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
    
    public function getRecentChatUsers(Request $request) {
        $id = Auth::id();

        $myData = Message::where("sender", $id)->orWhere("recipient", $id)->orderBy('created_at', 'desc')->get();
        
        if (count($myData)) {
            $lastChatUserId = $myData[0]['sender'] == $id ? $myData[0]['recipient'] : $myData[0]['sender'];
            $recentChatUsers = array();
            foreach($myData as $message) {
                if (count($recentChatUsers) < 2) {
                    if ($message['sender'] == $id){
                        if (!in_array($message['recipient'], $recentChatUsers))
                            array_push($recentChatUsers, $message['recipient']);
                    } else {
                        if (!in_array($message['sender'], $recentChatUsers))
                            array_push($recentChatUsers, $message['sender']);
                    }
                } else {
                    break;
                }
            }
            $userList = User::whereIn('id', $recentChatUsers)->get();
            return array('state' => 'true',
                    'recentChatUsers' => $userList,
                    'lastChatUserId' => $lastChatUserId);
        }
        return array('state' => 'false'); 
    }

    public function getCurrentChatContent(Request $request) {
        $id = Auth::id();
        $contactorId = $request->input('currentContactorId');
        $contactorInfo = User::where('id', $contactorId)->get();
        $messageData = Message::whereRaw("sender = ".$id." AND recipient = ".$contactorId)
            ->orWhereRaw("sender = ".$contactorId." AND recipient = ".$id)->orderBy('created_at', 'desc')->limit(100)->get();
        return array('state'=>'true', 'contactorInfo'=>$contactorInfo, 'messageData'=>$messageData);
    }


    public function getRecentChatData(Request $request) {
        
    }

    public function getUsersList(Request $request) {
        $id = Auth::id();
        // $userList = User::where('id', '<>', $id)->get();
        $userList = User::get();
        return array('state' => 'true', 'data' => $userList);
    }

    public function addContactItem(Request $request)
    {
        $id=Auth::id();
        
        $newContactInfo = User::where('email', $request->input('email'))->get();
        $contactIds = Contact::where('user_id', Auth::id())->get();
        if (!count($newContactInfo)) 
            return array(
                'message' => "This email doesn't register",
                'insertion' => false
            );
        foreach($contactIds as $contactId) {
            if ($newContactInfo[0]->id == $contactId->contact_id)
                return array(
                    'message' => 'This email exists in Contact',
                    'insertion' => false
                );
        }
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
        $contactIds = Contact::where('user_id', $id)->get('contact_id');
        // for ($i = 0; $i < count($contacts); $i++) {
        //     $msg = Message::where('sender',$contacts[$i]->contact_id)
        //         ->orWhere('recipient',$contacts[$i]->contact_id);
        //     $contacts[$i]['message'] = $msg->count() ? $msg->orderBy('created_at','desc')->get()[0] : '';
        //     $contacts[$i]['username'] = User::where('id', $contacts[$i]->contact_id)->get()[0]->username;
        // }
        return $contactIds;
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
        $description = $request->input('description');
        $user = User::find($id);
        $user->username = $username;
        $user->location = $location;
        $user->description = $description;
        if ($request->file('avatar') != null) {
            $path = $request->file('avatar')->store('upload/avatar');
            $user->avatar = $path;
        }
        // dd($path);
        $user->updated_at = date('Y-m-d H:i:s');
        $user->save();
        return array(
            'message' => 'Save Successfully',
            'update' => true,
        );
    }
    
    public function getPhotoRequest(Request $request)
    {
        $id = Auth::id();
        $requestData = PhotoRequest::where("from", $id)->orWhere("to", $id)->orderBy('created_at', 'desc')->limit(100)->get();
        return array('state'=>'true', 'data'=>$requestData);
    }

    public function sendPhotoRequest(Request $request) 
    {
        $id = Auth::id();
        $to = $request->input('to');
        $title = $request->input('title');
        $description = $request->input('description');
        $price = $request->input('price');
        $type = $request->input('type');
        $request = new PhotoRequest;
        $request->from = $id;
        $request->to = $to;
        $request->title = $title;
        $request->description = $description;
        $request->price = $price;
        $request->type = $type;
        $request->save();
        return;
    }
}