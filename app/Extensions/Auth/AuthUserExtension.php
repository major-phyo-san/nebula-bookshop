<?php

namespace App\Extensions\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

trait AuthUserExtension {

    public function getGuardName(){
        return $this->guard_name;
    }

    public function getUserName(){
        return $this->user_name;
    }

    public function makeCredentials(Request $request){
        $request->validate([
            $this->getUserName() => 'required|string',
            'password' => 'required|string'
        ]);

        return $request->only($this->getUserName(), 'password');
    }

    public function loggedOut(Request $request){
        //
    }

    public function attemptWebLogin(Request $request, $AuthenticatableModel){
        if(Auth::guard($this->getGuardName())->attempt($this->makeCredentials($request), $request->filled('remember'))){
            // login success
            return $this->sendWebLoginResponse($request);
        }
        else{
            // login failure
            if(!$AuthenticatableModel::where($this->getUserName(), $request[$this->getUserName()])->exists()){
                return redirect($this->failureRedirectTo)->with(['message' => 'user not found']);
            }
            else{
                return redirect($this->failureRedirectTo)->with(['message' => 'incorrect password']);
            }
        }
    }

    public function sendWebLoginResponse(Request $request){
        if ($request->hasSession()) {
            $request->session()->put('auth.password_confirmed_at', time());
        }

        $request->session()->regenerate();

        return redirect($this->successRedirectTo);
    }

    public function attemptWebLogout(Request $request){
        Auth::guard($this->getGuardName())->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        if ($response = $this->loggedOut($request)) {
            return $response;
        }

        return $this->sendWebLogoutResponse();
    }

    public function sendWebLogoutResponse(){
        return redirect('/');
    }

    public function attemptApiLogin(Request $request, $AuthenticatableModel){
        if(Auth::guard($this->getGuardName())->attempt($this->makeCredentials($request))){
            return $this->sendApiLoginResponse($request, $AuthenticatableModel);
        }
        else{
            // login failure
            if(!$AuthenticatableModel::where($this->getUserName(), $request[$this->getUserName()])->exists()){
                return response()->json([
                    'message' => 'user not found'
                ], 404);
            }
            else{
                return response()->json([
                    'message' => 'incorrect password'
                ], 401);
            }
        }
    }

    public function sendApiLoginResponse(Request $request, $AuthenticatableModel){
        $auth_user = $AuthenticatableModel::where($this->getUserName(), $request[$this->getUserName()])->firstOrFail();
        $token = $auth_user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'user_id' => $auth_user->id,
            'access_token' => $token,
            'token_type' => 'Bearer'
        ]);
    }

    public function attemptApiLogout(Request $request){
        Auth::guard($this->getGuardName())->logout();

        if ($response = $this->loggedOut($request)) {
            return $response;
        }

        return $this->sendApiLogoutResponse();
    }

    public function sendApiLogoutResponse(){
        return response()->json([], 204);
    }
}
