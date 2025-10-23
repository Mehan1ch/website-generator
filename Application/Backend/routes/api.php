<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::controller(UserController::class)->middleware('auth:sanctum')->group(function () {
    Route::get('/user', 'show');
    Route::post('/user/avatar', 'avatar');
    Route::delete('/user', 'destroy');
});
