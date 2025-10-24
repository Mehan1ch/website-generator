<?php

use App\Http\Controllers\Api\V1\AvatarController;
use App\Http\Controllers\Api\V1\UserController;
use Illuminate\Support\Facades\Route;

/**
 * User Routes
 *
 * @group User Management
 * @authenticated
 */
Route::controller(UserController::class)->middleware('auth:sanctum')->group(function () {
    Route::get('/user', 'show');
    Route::delete('/user', 'destroy');
});

/**
 * Avatar Routes
 *
 * @group Avatar Management
 * @authenticated
 */
Route::controller(AvatarController::class)->middleware('auth:sanctum')->group(function () {
    Route::post('/avatar', 'store');
});
