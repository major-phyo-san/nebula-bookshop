<?php

namespace App\Http\Controllers\API\MGMT;

use App\Http\Controllers\Controller;
use App\Extensions\Auth\AuthUserExtension;
use App\Models\Admin;
use Illuminate\Http\Request;

class AdminAuthController extends Controller{
    // use AuthenticatesUsers;
    // private $user_name = 'email';

    // public function loginAdmin(Request $request){
    //     $this->validateLogin($request);
    //     if(Auth::guard('admin_web')->attempt($this->credentials($request))){
    //         $admin = Admin::where($this->user_name, $request[$this->user_name])->firstOrFail();
    //         $token = $admin->createToken('auth_token')->plainTextToken;
    //         return response()->json([
    //             'admin_id' => $admin->id,
    //             'access_token' => $token,
    //             'token_type' => 'Bearer'
    //         ]);
    //     }
    //     else{
    //         return response()->json(['message' => 'error']);
    //     }
    // }

    // private function username(){
    //     return $this->user_name;
    // }

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
