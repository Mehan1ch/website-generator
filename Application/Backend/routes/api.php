<?php

use App\Http\Controllers\AvatarController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::controller(UserController::class)->middleware('auth:sanctum')->group(function () {
    Route::get('/user', 'show');
    Route::delete('/user', 'destroy');
});

Route::controller(AvatarController::class)->middleware('auth:sanctum')->group(function () {
    Route::post('/avatar', 'store');
});
