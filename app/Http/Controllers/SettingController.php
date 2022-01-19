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

class SettingController extends Controller
{
    public function setPhoneNumber(Request $request) {
        $id = Auth::id();
        $phoneNumber = $request->input('phoneNumber');
        $user = User::find($id);
        $user->phone_number = $phoneNumber;
        $user->updated_at = date('Y-m-d H:i:s');
        $user->save();
        return array(
            'message' => 'Save Successfully',
            'update' => true,
        );
    }
    
}