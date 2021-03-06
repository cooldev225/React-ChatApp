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
use App\Models\PhotoGallery;
use App\Models\Rating;
use App\Models\PaymentHistory;
use App\Events\NewMessage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;


use App\Models\Group;
use App\Models\UsersGroup;
use Illuminate\Support\Collection;

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
        $type = $request->input('type');
        $groupArrs = User::join('users_groups', 'users.id', '=', 'users_groups.user_id')
        ->join('groups', 'users_groups.group_id', '=', 'groups.id')
        ->where('users.id', $id)
        ->where('groups.type', $type)
        ->orderBy('groups.created_at', 'desc')
        ->get('groups.*')->toArray();
        if (count($groupArrs)) {
            // $result = Group::where()
            foreach($groupArrs as $index => $group) {
                // array_push($result, $this->getGroupUsers($group['id']));
                $groupArrs[$index]['users'] = $this->getGroupUsers($group['id']);
                $groupArrs[$index]['lastMessage'] = Message::where('group_id', $group['id'])->orderBy('created_at', 'desc')->first();
            }
            if ($type == 3) {
                $groupArrs = array_filter($groupArrs, function ($item) {
                    return $item["owner"] == Auth::id();
                });
            }
            // $groupArrs = collect($groupArrs)->sortBy('lastMessage')
            usort($groupArrs, function ($a, $b) {
                $val1 = $a['lastMessage'] ? strtotime($a['lastMessage']['created_at']) : strtotime($a['created_at']);
                $val2 = $b['lastMessage'] ? strtotime($b['lastMessage']['created_at']) : strtotime($b['created_at']);
                return $val1 - $val2;
            });
            return array('state' => 'true', 'data' => $groupArrs);
        } else {
            return array('state' => 'false');
        }
    }
    
    public function getGroupUsers($groupId) {
        $groupUsers = UsersGroup::where('group_id', $groupId)->orderBy('created_at')->get('user_id');
        $result = $groupUsers->map(function($item) {
            return $item['user_id'];
        });
        return $result;
    }

    public function getUsersListByGroupId(Request $request) {
        $groupId = $request->input('groupId');
        $groupUsers = UsersGroup::where('group_id', $groupId)->orderBy('created_at')->get('user_id');
        $result = $groupUsers->map(function($item) {
            return $item['user_id'];
        });
        return array('state' => 'true', 'data' => $result);;
    }

    public function getCurrentChatContent(Request $request) {
        $id = Auth::id();
        $contactorId = $request->input('currentContactorId');
        $messageData = Message::whereRaw("sender = ".$id." AND recipient = ".$contactorId)
            ->orWhereRaw("sender = ".$contactorId." AND recipient = ".$id)->orderBy('created_at', 'desc')->limit(20)->get();
        $messages = $messageData->map(function($item) {
            if ($item['kind'] == 0) 
                return $item;
            if ($item['kind'] == 1) {
                $temp = PhotoRequest::where('id', $item['content'])->get();
                $item['requestId'] = $temp[0]['id'];
                $item['content'] = $temp[0]['price'];
                return $item;
            }
            $temp = PhotoGallery::where('id', $item['content'])->get();
            $item['photoId'] = $temp[0]['id'];
            $item['content'] = $temp[0]['photo'];
            return $item;
        });
        
        return array('state'=>'true','messageData'=>$messages);
    }

    public function getCurrentGroupChatContent(Request $request) {
        $id = Auth::id();
        $groupId = $request->input('currentGroupId');
        $messageData = Message::where("group_id", $groupId)->orderBy('created_at', 'desc')->limit(15)->get();
        $messages = $messageData->map(function($item) {
            if ($item['kind'] == 0) 
                return $item;
            if ($item['kind'] == 1) {
                $temp = PhotoRequest::where('id', $item['content'])->get();
                $item['requestId'] = $temp[0]['id'];
                $item['content'] = $temp[0]['price'];
                return $item;
            }
            $temp = PhotoGallery::where('id', $item['content'])->get();
            $item['photoId'] = $temp[0]['id'];
            $item['content'] = $temp[0]['photo'];
            return $item;
        });
        $groupInfo = Group::where('id', $groupId)->first();
        
        return array('state'=>'true','messageData'=>$messages, 'groupInfo'=>$groupInfo);
    }
    
    public function getRateData(Request $request) {
        $userId = $request->input('userId');
        $rateData = Rating::where('user_id', $userId)->get();
        return array('state'=>'true', 'rateData'=>$rateData);
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
        $contactList = User::whereIn('id', $contactIds)->orderBy('username')->get();
        return $contactList;

        // for ($i = 0; $i < count($contacts); $i++) {
        //     $msg = Message::where('sender',$contacts[$i]->contact_id)
        //         ->orWhere('recipient',$contacts[$i]->contact_id);
        //     $contacts[$i]['message'] = $msg->count() ? $msg->orderBy('created_at','desc')->get()[0] : '';
        //     $contacts[$i]['username'] = User::where('id', $contacts[$i]->contact_id)->get()[0]->username;
        // }
        // return $contactIds;
    }
    
    public function getChatData(Request $request)
    {
        $id = Auth::id();
        $contactIds = $request->input('currentContactId');
        $contactIds = $contactIds == 'undefined' ? Contact::where('user_id', $id)->get('contact_id') : array(array('contact_id' => $contactIds));
        // $contactIds = array(array('contact_id' => $contactIds));
        $result = array();
        foreach ($contactIds as $contactId) {
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
        //$id = Auth::id();
	    /*$id =$request->input('id');
    	$user =  User::find($id);
        $contactId = $request->input('currentContactID');
        $content = $request->input('content');
        $newMessage = new Message;
        $newMessage->sender = $id;
        $newMessage->recipient = $contactId;
        $newMessage->content = $content;
        return array(
            'message' => 'Save Successfully',
            'insertion' => true,
        );*/
        return true;
	//broadcast(new NewMessage($user, $newMessage))->toOthers();
    }

    public function saveProfileInfo(Request $request)
    {
        $id = Auth::id();
        $username = $request->input('username');
        $location = $request->input('location');
        $description = $request->input('description');
        $user = User::find($id);
        $user->firstName = $username;
        $user->location = $location;
        $user->description = $description;
        if ($request->file('avatar') != null) {
            $path = $request->file('avatar')->store('upload/avatar');
            $user->avatar = $path;
        }
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

    public function getPhotoData(Request $request)
    {
        $messageId = $request->input('id');
        $messageData = Message::where('id', $messageId)->get();
        if (count($messageData)) {
            $photoData = PhotoGallery::where('id', $messageData[0]['content'])->get();
            if (count($photoData)) {
                $photoData[0]['rate'] = $messageData[0]['rate'];
                $photoData[0]['messageId'] = $messageData[0]['id'];
                return array('state'=>'true', 'data'=>$photoData);
            }
        }
        return array('state'=>'false');

    }
    public function setContentRate(Request $request)
    {
        $messageId = $request->input('messageId');
        $rate = $request->input('rate');
        $message = Message::find($messageId);
        $message->rate = $rate;
        $message->updated_at = date('Y-m-d H:i:s');
        $message->save();
        return array(
            'state' => 'true'
        );
    }
    public function getPaymentHistories(Request $request)
    {
        $userId = $request->input('userId');
        $data = PaymentHistory::where("sender", $userId)->orWhere("recipient", $userId)->orderBy('created_at', 'desc')->get();
        return array(
            'state' => 'true',
            'data' => $data
        );
    }

    public function loadMoreMessages(Request $request) {
        $id = Auth::id();
        $groupId = $request->input('globalGroupId');
        $firstMessageId = $request->input('firstMessageId');
        
        // $messageData = Message::whereRaw("sender = ".$id." AND recipient = ".$contactorId." AND id < ".$firstMessageId)
        //     ->orWhereRaw("sender = ".$contactorId." AND recipient = ".$id." AND id < ".$firstMessageId)->orderBy('created_at', 'desc')->limit(5)->get();
        $messageData = Message::where("group_id", $groupId)->where('id', '<', $firstMessageId)->orderBy('created_at', 'desc')->limit(5)->get();

        $messages = $messageData->map(function($item) {
            if ($item['kind'] == 0) 
                return $item;
            if ($item['kind'] == 1) {
                $temp = PhotoRequest::where('id', $item['content'])->get();
                $item['requestId'] = $temp[0]['id'];
                $item['content'] = $temp[0]['price'];
                return $item;
            }
            $temp = PhotoGallery::where('id', $item['content'])->get();
            $item['photoId'] = $temp[0]['id'];
            $item['content'] = $temp[0]['photo'];
            return $item;
        });
        
        return array('state'=>'true','messageData'=>$messages);
    }
}
