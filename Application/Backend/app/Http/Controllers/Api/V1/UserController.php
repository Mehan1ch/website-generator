<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\UserResource;

/**
 * User Controller
 *
 * Handles user-related operations such as retrieving and deleting user information.
 * @group Users
 * @authenticated
 */
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
