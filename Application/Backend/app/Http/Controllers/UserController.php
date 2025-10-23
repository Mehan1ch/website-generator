<?php

namespace App\Http\Controllers;

use App\Http\Requests\AvatarRequest;
use App\Http\Resources\UserResource;
use GuzzleHttp\Psr7\Request;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig;

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

    /**
     * Upload avatar
     *
     * Upload and set the authenticated user's avatar image.
     */
    public function avatar()
    {
        $user = auth()->user();
        try {
            $user->addMediaFromRequest('avatar')->toMediaCollection('avatar');
        } catch (FileDoesNotExist $e) {
            return response()->json(['message' => 'File does not exist.', 'error' => $e], 400);
        } catch (FileIsTooBig $e) {
            return response()->json(['message' => 'File is too big.', 'error' => $e], 400);
        }
        return response()->json(['message' => 'Avatar uploaded successfully.'], 201);
    }
}
