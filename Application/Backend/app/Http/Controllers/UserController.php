<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;

class UserController extends Controller
{

    /**
     * Get user
     *
     * Return the authenticated user's information.
     */
    public function show()
    {
        $user = auth()->user();
        return new UserResource($user);
    }

    /**
     * Delete user
     *
     * Delete the authenticated user's account and all associated data.
     */
    public function destroy()
    {
        $user = auth()->user();
        $user->delete();
        return response()->noContent();
    }
}
