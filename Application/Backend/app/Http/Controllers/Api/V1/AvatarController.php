<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\AvatarRequest;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig;

/**
 * Avatar Controller
 *
 * Handles avatar-related operations such as uploading user avatars.
 * @group Avatars
 * @authenticated
 */
class AvatarController extends Controller
{
    /**
     * Post avatar
     *
     * Upload and set the authenticated user's avatar image.
     * @response 201 {"message": "Avatar uploaded successfully."}
     * @response 400 {"message": "File does not exist.", "error": "..."}
     * @response 400 {"message": "File is too big.", "error": "..."}
     */
    public function store(AvatarRequest $request)
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

    /**
     * Delete avatar
     *
     * Remove the authenticated user's avatar image.
     * @response 204 {}
     */
    public function destroy()
    {
        $user = auth()->user();
        $user->clearMediaCollection('avatar');
        return response()->noContent();
    }
}
