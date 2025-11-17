<?php

namespace App\Http\Resources\Api\V1;

use App\Http\Resources\Api\V1\Collections\PageCollection;
use App\Models\Site;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Site
 */
class SiteResource extends JsonResource
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
            'subdomain' => $this->subdomain,
            'description' => $this->description,
            'user_id' => $this->user_id,
            'state' => $this->state,
            'pages' => new PageCollection($this->pages),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'published_at' => $this->published_at
        ];
    }
}
