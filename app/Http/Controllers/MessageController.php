<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Crypt;
use Stevebauman\Location\Facades\Location;
use Illuminate\Support\Facades\Auth;

use App\Models\Country;
use App\Models\CountryPhoneCode;
use App\Models\State;
use App\Models\City;
use App\Models\User;
use App\Models\Message;
use App\Models\Contact;
use App\Models\PhotoRequest;
use App\Models\PhotoGallery;
use App\Models\Rating;
use App\Models\PaymentHistory;
use App\Models\Cast;
use App\Models\Group;
use App\Models\UsersGroup;

class MessageController extends Controller
{
    public function getLastMessage(Request $request) {
        $groupId = $request->input('groupId');
        $lastMessage = Message::where('group_id', $groupId)->orderBy('created_at', 'desc')->first();
        return array('state' => 'true', 'data' => $lastMessage);
    }

    public function getGroupData(Request $request) {
        $userId = Auth::id();
        $groupArrs = User::join('users_groups', 'users.id', '=', 'users_groups.user_id')
        ->join('groups', 'users_groups.group_id', '=', 'groups.id')
        ->where('users.id', $userId)
        ->where('groups.type', 2)
        // ->whereRaw("(sender = ".$id." OR users_groups.user_id = ".$id.") AND groups.type = 1")
        ->orderBy('groups.created_at', 'desc')
        ->get('groups.*');

        if (count($groupArrs)) {
            // $result = Group::where()
            foreach($groupArrs as $index => $group) {
                // array_push($result, $this->getGroupUsers($group['id']));
                $groupArrs[$index]['users'] = $this->getGroupUsers($group['id']);
            }
            return array('state' => 'true', 'data' => $groupArrs);
        } else {
            return array('state' => 'false');
        }

        $groupData = Group::get();
        $result = array();
        foreach($groupData as $groupItem) {
            $userArr = explode(",", $groupItem['users']);
            if (in_array($userId, $userArr)) {
                array_push($result, $groupItem);
            }
            // if ($groupItem['owner'] == $userId || in_array($userId, $userArr)) {
            //     array_push($result, $groupItem);
            // }
        }
        return array('state' => 'true', 'data' => $result);

    }

    public function getCastData(Request $request) {
        $userId = Auth::id();
        $castData = Cast::where('sender', $userId)->groupBy('cast_title')->orderByRaw('max(`created_at`) desc')->get();
        if (count($castData)) {
            return array('state'=>'true', 'castData'=>$castData);
        } else {
            return array('state' => 'false');
        }
    }

    public function displayCastChatData(Request $request) {
        $userId = Auth::id();
        $recipients = $request->input('recipients');
        $castTitle = $request->input('castTitle');
        // $castData = Cast::where('sender', $userId)->where('recipients', $recipients)->orderBy('created_at', 'desc')->get();
        $castData = Cast::where('sender', $userId)->where('cast_title', $castTitle)->orderBy('created_at', 'desc')->get();
        $messages = $castData->map(function($item) {
            if ($item['kind'] == 0) 
                return $item;
            if ($item['kind'] == 1) {
                $temp = PhotoRequest::where('id', $item['content'])->get();
                $item['requestId'] = $temp[0]['id'];
                $item['content'] = $temp[0]['price'];
                return $item;
            }
            $temp = PhotoGallery::where('id', $item['content'])->get();
            $item['castId'] = $item['id'];
            $item['photoId'] = $temp[0]['id'];
            $item['content'] = $temp[0]['photo'];
            return $item;
        });
        if (count($messages)) {
            return array('state'=>'true', 'data'=>$messages);
        } else {
            return array('state' => 'false');
        }
    }

    public function deleteChatThread(Request $request) {
        $userId = Auth::id();
        $recipients = $request->input('recipient');
        $res = Message::whereRaw("sender = ".$userId." AND recipient = ".$recipients)->orWhereRaw("sender = ".$recipients." AND recipient = ".$userId)->delete();
        if ($res) {
            return array('state'=>'true', 'data'=>$res);
        } else {
            return array('state' => 'false');
        }
    }

    public function deleteCastThread(Request $request) {
        $userId = Auth::id();
        $recipients = $request->input('recipients');
        $castTitle = $request->input('castTitle');
        $res = Cast::where("sender", $userId)->where("cast_title", $castTitle)->delete();
        if ($res) {
            return array('state'=>'true', 'data'=>$res);
        } else {
            return array('state' => 'false');
        }
    }

}