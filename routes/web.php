<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\Authenticate;
use App\Http\Middleware\AdminAuthenticate;

Auth::routes();
Route::get('/login', 'AuthController')->name('login');
Route::post('/login', 'AuthController@login');
Route::get('/register', 'AuthController@register')->name('register');
Route::post('/register', 'AuthController@register');
Route::post('/logout', 'AuthController@logout');
Route::get('/forgot', 'AuthController@forgot')->name('forgot');
Route::post('/forgot', 'AuthController@forgot');
Route::get('/logout', 'AuthController@logout')->name('logout');

Route::get('/admin/login', 'Admin\\AuthController@login')->name('admin_login');
Route::post('/admin/login', 'Admin\\AuthController@login');
Route::post('/admin/logout', 'Admin\\AuthController@logout');
Route::get('/admin/forgot', 'Admin\\AuthController@forgot')->name('admin_forgot');
Route::post('/admin/forgot', 'Admin\\AuthController@forgot');
Route::get('/admin/logout', 'Admin\\AuthController@logout')->name('admin_logout');

Route::group(['middleware' => ['login']], function () {
    Route::get('/', 'HomeController@index');
    Route::get('/home', 'HomeController@index')->name('home');
    Route::post('/home/getContactList', 'HomeController@getContactList');
});

Route::group(['middleware' => ['admin']], function () {
    Route::get('/admin', 'Admin\\HomeController@index');
    Route::get('/admin/home', 'Admin\\HomeController@index')->name('dashboard');
});
Route::post('/developer', 'Util\\DbUtil@developer');

Route::post('/v1/api/uploadFile', 'Util\\FileUtil@uploadFile');
Route::get('/v1/api/downloadFile', 'Util\\FileUtil@downloadFile');