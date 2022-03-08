<?php

namespace App\Http\Controllers\WEB\App\Auth;

use Illuminate\Http\Request;
use App\Extensions\Auth\AuthUserExtension;
use App\Http\Controllers\Controller;
use App\Models\User;

class UserAuthController extends Controller{

    use AuthUserExtension;
    private $successRedirectTo = "/users";
    private $failureRedirectTo = "/login";
    private $guard_name = 'web';
    private $user_name = 'phone_number';

    public function showUserLoginForm(){
        return view('auth.login');
    }

    public function loginUser(Request $request){
        return $this->attemptWebLogin($request, User::class);
    }

    public function logoutUser(Request $request){
        return $this->attemptWebLogout($request);
    }
}
