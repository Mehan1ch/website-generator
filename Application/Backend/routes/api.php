<?php

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/**
 * User
 *
 * Get the authenticated user.
 */
Route::get('/user', function (Request $request) {
    return new UserResource($request->user());
})->middleware('auth:sanctum');
