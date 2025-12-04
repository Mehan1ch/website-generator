<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\Roles;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\SchemaRequest;
use App\Http\Resources\Api\V1\Collections\SchemaCollection;
use App\Http\Resources\Api\V1\SchemaResource;
use App\Models\Schema;
use App\States\Draft;
use App\States\Published;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Spatie\ModelStates\Exceptions\CouldNotPerformTransition;

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
     * @queryParam page integer The page number. Example: 1
     * @queryParam per_page integer Number of items per page. Defaults to 15. Max 100.
     */
    public function index(Request $request)
    {
        $perPage = (int)$request->query('per_page', 15);
        $perPage = max(1, min($perPage, 100));
        if (auth()->user()->hasAnyRole(Roles::ADMIN, Roles::SUPER_ADMIN)) {
            return new SchemaCollection(Schema::query()->paginate($perPage));
        }
        return new SchemaCollection(Schema::whereNotState('state', Draft::class)->paginate($perPage));
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
     * Publish Schema
     *
     * Publish the specified schema.
     * @apiResource App\Http\Resources\Api\V1\SchemaResource
     * @apiResourceModel App\Models\Schema
     *
     */
    public function publish(Schema $schema)
    {
        try {
            $schema->state->transitionTo(Published::class);
            return new SchemaResource($schema);
        } catch (CouldNotPerformTransition $e) {
            return response()->json(['message' => 'Could not publish schema: ', 'error' => $e->getMessage()], 400);
        }
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
