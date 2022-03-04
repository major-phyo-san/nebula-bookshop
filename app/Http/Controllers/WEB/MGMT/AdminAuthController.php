<?php

namespace App\Http\Controllers\WEB\MGMT;

use App\Http\Controllers\Controller;

use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Extensions\Auth\AuthUserExtension;
use App\Models\Admin;

class AdminAuthController extends Controller{
    // use AuthenticatesUsers;

    // protected $redirectTo = "/mgmt/admins";

    public function showAdminLoginForm(){
        return view('mgmt.auth.login');
    }

    // public function loginAdmin(Request $request){
    //     $this->validateLogin($request);
    //     if(Auth::guard('admin_web')->attempt($this->credentials($request), $request->filled('remember'))){
    //         if ($request->hasSession()) {
    //             $request->session()->put('auth.password_confirmed_at', time());
    //         }
    //         return redirect($this->redirectTo);
    //     }
    // }

    // public function logoutAdmin(Request $request){
    //     Auth::guard('admin_web')->logout();
    //     $request->session()->invalidate();

    //     $request->session()->regenerateToken();

    //     if ($response = $this->loggedOut($request)) {
    //         return $response;
    //     }

    //     return redirect('/');
    // }

    use AuthUserExtension;
    private $successRedirectTo = "/mgmt/admins";
    private $failureRedirectTo = "/mgmt/login";
    private $guard_name = 'admin_web';
    private $user_name = 'email';

    public function loginAdmin(Request $request){
        return $this->attemptWebLogin($request, Admin::class);
    }

    public function logoutAdmin(Request $request){
        return $this->attemptWebLogout($request);
    }
}
