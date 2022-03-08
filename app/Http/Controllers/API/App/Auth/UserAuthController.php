<?php

namespace App\Http\Controllers\API\App\Auth;

use App\Http\Controllers\Controller;
use App\Extensions\Auth\AuthUserExtension;
use App\Models\User;
use Illuminate\Http\Request;

class UserAuthController extends Controller
{
    //
    use AuthUserExtension;
    private $successRedirectTo = "/users";
    private $failureRedirectTo = "/login";
    private $guard_name = 'web';
    private $user_name = 'phone_number';

    public function loginUser(Request $request){
        return $this->attemptApiLogin($request, User::class);
    }

    public function logoutUser(Request $request){
        return $this->attemptApiLogout($request);
    }
}
