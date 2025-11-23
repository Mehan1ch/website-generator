<?php

namespace App\Http\Resources\Api\V1;

use App\Enums\Roles;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin User
 */
class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'avatar' => $this->avatar,
            'is_admin' => $this->hasAnyRole([Roles::SUPER_ADMIN, Roles::ADMIN]),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
