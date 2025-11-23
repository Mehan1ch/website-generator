<?php

namespace App\Http\Resources\Api\V1\Collections;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SchemaCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection->transform(function ($schema) {
                return [
                    'id' => $schema->id,
                    'name' => $schema->name,
                    "description" => $schema->description,
                    "state" => $schema->state,
                    "created_at" => $schema->created_at,
                    "updated_at" => $schema->updated_at,
                    "published_at" => $schema->published_at,
                ];
            })
        ];
    }
}
