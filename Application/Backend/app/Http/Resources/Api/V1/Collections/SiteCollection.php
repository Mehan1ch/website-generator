<?php

namespace App\Http\Resources\Api\V1\Collections;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SiteCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection->transform(function ($site) {
                return [
                    'id' => $site->id,
                    'name' => $site->name,
                    'subdomain' => $site->subdomain,
                    'description' => $site->description,
                    'state' => $site->state,
                    'created_at' => $site->created_at,
                    'updated_at' => $site->updated_at,
                    'published_at' => $site->published_at
                ];
            })
        ];
    }
}
