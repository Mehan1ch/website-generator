<?php

namespace App\Http\Controllers;

use App\Http\Requests\AvatarRequest;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig;

class AvatarController extends Controller
{
    /**
     * Post avatar
     *
     * Upload and set the authenticated user's avatar image.
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
}
