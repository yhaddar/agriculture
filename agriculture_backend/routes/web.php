<?php

use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;

Route::get('/validate/email', function (\Illuminate\Http\Request $request) {
    $user = $request->query("email");
    return view('mail/validate', ["user" => $user]);
})->name("home");

Route::get("test", function () {

    $isLogin = "nothing";
    return view("test", compact("isLogin"));

});
