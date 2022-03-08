<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\MGMT\AdminAuthController;
use App\Http\Controllers\API\App\Auth\UserAuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'mgmt'], function(){
    Route::post('/login', [AdminAuthController::class, 'loginAdmin']);
});

Route::group(['prefix' => 'mgmt'], function(){
    Route::group(['middleware' => 'auth:admin_api'], function(){
        Route::get('/admins', function(){
            return response()->json(['data'=>'success']);
        });
        Route::post('/logout', [AdminAuthController::class, 'logoutAdmin']);
    });
});

Route::post('/login', [UserAuthController::class, 'loginUser']);

Route::group(['middleware' => 'auth:api'], function(){
    Route::get('/users', function(){
        return response()->json(['data' => 'nope']);
    });
    Route::post('/logout', [UserAuthController::class, 'logoutUser']);
});
