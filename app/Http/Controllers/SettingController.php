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

class SettingController extends Controller
{
    public function setPhoneNumber(Request $request) {
        $id = Auth::id();
        $dialCode = $request->input('dialCode');
        $isoCode2 = $request->input('isoCode2');
        $phoneNumber = $request->input('phoneNumber');
        $smsType = $request->input('smsType');
        
        // $isoCode2 = Country::where('id', $countryId)->get()[0]['iso_code2'];
        $user = User::find($id);
        $user->phone_number = $phoneNumber;
        $user->national = $isoCode2;
        $user->sms_type = $smsType;
        $user->updated_at = date('Y-m-d H:i:s');
        $user->save();
        return array(
            'message' => 'Save Successfully',
            'update' => true,
        );
    }
    public function getPhoneNumber(Request $request) {
        // $id = Auth::id();
        // $user = User::find($id);
        // $user->phone_number = $phoneNumber;
        // $user->updated_at = date('Y-m-d H:i:s');
        // $user->save();
        // return array(
        //     'message' => 'Save Successfully',
        //     'update' => true,
        // );
        // $id = Auth::id();
        // $requestData = PhotoRequest::where("from", $id)->orWhere("to", $id)->orderBy('created_at', 'desc')->limit(100)->get();
        // return array('state'=>'true', 'data'=>$requestData);
    }
    
    public function setNotification(Request $request) {
        $id = Auth::id();
        $state = $request->input('state');
        
        $user = User::find($id);
        $user->notification = $state;
        $user->updated_at = date('Y-m-d H:i:s');
        $user->save();
        return array(
            'message' => 'Save Successfully',
            'update' => true,
        );
    }
}