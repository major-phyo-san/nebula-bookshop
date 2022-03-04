<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\WEB\MGMT\AdminAuthController;
use App\Http\Controllers\WEB\App\Auth\UserAuthController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::group(['prefix' => 'mgmt'], function(){
    Route::get('/login', [AdminAuthController::class, 'showAdminLoginForm'])->name('admin.login');
    Route::post('/login', [AdminAuthController::class, 'loginAdmin']);
});

Route::group(['prefix' => 'mgmt'], function(){
    Route::group(['middleware' => 'auth:admin_web'], function(){
        Route::get('/admins', function(){
            return view('mgmt.admins');
        });
        Route::post('/logout', [AdminAuthController::class, 'logoutAdmin']);
    });
});

Route::get('/login', [UserAuthController::class, 'showUserLoginForm'])->name('login');
Route::post('/login', [UserAuthController::class, 'loginUser']);

Route::group(['middleware' => 'auth:web'], function(){
    Route::get('/users', function(){
        return view('users');
    });
    Route::post('/logout', [UserAuthController::class, 'logoutUser']);
});
