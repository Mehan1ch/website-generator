<?php

namespace App\Http\Resources\Api\V1\Collections;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PageCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection->transform(function ($page) {
                return [
                    'id' => $page->id,
                    'title' => $page->title,
                    'url' => $page->url,
                ];
            })
        ];
    }
}
