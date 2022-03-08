<?php

namespace App\Http\Controllers\WEB\MGMT;

use App\Http\Controllers\Controller;

use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Extensions\Auth\AuthUserExtension;
use App\Models\Admin;

class AdminAuthController extends Controller{

    use AuthUserExtension;
    private $successRedirectTo = "/mgmt/admins";
    private $failureRedirectTo = "/mgmt/login";
    private $guard_name = 'admin_web';
    private $user_name = 'email';

    public function showAdminLoginForm(){
        return view('mgmt.auth.login');
    }

    public function loginAdmin(Request $request){
        return $this->attemptWebLogin($request, Admin::class);
    }

    public function logoutAdmin(Request $request){
        return $this->attemptWebLogout($request);
    }
}
