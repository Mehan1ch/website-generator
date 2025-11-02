<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\SchemaRequest;
use App\Http\Resources\Api\V1\Collections\SchemaCollection;
use App\Http\Resources\Api\V1\SchemaResource;
use App\Models\Schema;
use Illuminate\Http\Request;

/**
 * Schema Controller
 *
 * Handles schema-related operations such as listing, creating, viewing, updating, and deleting schemas.
 * @group Schemas
 * @authenticated
 */
class SchemaController extends Controller
{
    /**
     * Get Schemas
     *
     * Display all schemas with pagination.
     * @apiResourceCollection App\Http\Resources\Api\V1\Collections\SchemaCollection
     * @apiResourceModel App\Models\Schema paginate=15
     */
    public function index()
    {
        return new SchemaCollection(Schema::paginate());
    }

    /**
     * Create Schema
     *
     * Store a newly created schema.
     * @apiResource App\Http\Resources\Api\V1\SchemaResource status=201
     * @apiResourceModel App\Models\Schema
     */
    public function store(SchemaRequest $request)
    {
        $schema = Schema::create($request->validated());

        return response()->json(new SchemaResource($schema), 201);
    }

    /**
     * Get Schema
     *
     * Display the specified schema.
     * @apiResource App\Http\Resources\Api\V1\SchemaResource
     * @apiResourceModel App\Models\Schema
     */
    public function show(Schema $schema)
    {
        return new SchemaResource($schema);
    }

    /**
     * Update Schema
     *
     * Update the specified schema.
     * @apiResource App\Http\Resources\Api\V1\SchemaResource
     * @apiResourceModel App\Models\Schema
     */
    public function update(SchemaRequest $request, Schema $schema)
    {
        $schema->update($request->validated());

        return new SchemaResource($schema);
    }

    /**
     * Delete Schema
     *
     * Remove the specified schema.
     * @response 204
     */
    public function destroy(Schema $schema)
    {
        $schema->delete();

        return response()->noContent();
    }
}
