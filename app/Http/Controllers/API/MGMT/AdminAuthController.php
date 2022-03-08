<?php

namespace App\Http\Controllers\API\MGMT;

use App\Http\Controllers\Controller;
use App\Extensions\Auth\AuthUserExtension;
use App\Models\Admin;
use Illuminate\Http\Request;

class AdminAuthController extends Controller{

    use AuthUserExtension;
    private $successRedirectTo = "/mgmt/admins";
    private $failureRedirectTo = "/mgmt/login";
    private $guard_name = 'admin_web';
    private $user_name = 'email';

    public function loginAdmin(Request $request){
        return $this->attemptApiLogin($request, Admin::class);
    }

    public function logoutAdmin(Request $request){
        return $this->attemptApiLogout($request);
    }
}
