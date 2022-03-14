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

class MessageController extends Controller
{
    public function getCastData(Request $request) {
        $userId = Auth::id();
        $castData = Cast::where('sender', $userId)->groupBy('recipients')->orderBy('created_at', 'desc')->get();
        if (count($castData)) {
            return array('state'=>'true', 'castData'=>$castData);
        } else {
            return array('state' => 'false');
        }
    }

    public function displayCastChatData(Request $request) {
        $userId = Auth::id();
        $recipients = $request->input('recipients');

        $castData = Cast::where('sender', $userId)->where('recipients', $recipients)->orderBy('created_at', 'desc')->get();
        if (count($castData)) {
            return array('state'=>'true', 'data'=>$castData);
        } else {
            return array('state' => 'false');
        }
    }

}