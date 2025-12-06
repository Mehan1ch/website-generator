<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\StoreSiteRequest;
use App\Http\Requests\Api\V1\UpdateSiteRequest;
use App\Http\Resources\Api\V1\Collections\SiteCollection;
use App\Http\Resources\Api\V1\SiteResource;
use App\Models\Site;
use Illuminate\Http\Request;

/**
 * Site Controller
 *
 * Handles site-related operations such as listing, creating, viewing, updating, and deleting sites.
 * @group Sites
 * @authenticated
 */
class SiteController extends Controller
{
    /**
     * Get Sites
     *
     * Display all sites for the authenticated user.
     * @queryParam page integer The page number. Example: 1
     * @apiResourceCollection App\Http\Resources\Api\V1\Collections\SiteCollection
     * @apiResourceModel App\Models\Site paginate=15
     * @queryParam page integer The page number. Example: 1
     * @queryParam per_page integer Number of items per page. Defaults to 15.
     */
    public function index(Request $request)
    {
        $perPage = (int)$request->query('per_page', 15);
        $perPage = max(1, min($perPage, 100));
        return new SiteCollection(Site::query()->where('user_id', auth()->id())->paginate($perPage));
    }

    /**
     * Create Site
     *
     * Store a newly created site for the authenticated user.
     * @apiResource App\Http\Resources\Api\V1\SiteResource status=201
     * @apiResourceModel App\Models\Site
     */
    public function store(StoreSiteRequest $request)
    {
        $site = auth()->user()->sites()->create($request->validated());
        return response()->json(new SiteResource($site), 201);
    }

    /**
     * Get Site
     *
     * Display the specified site.
     * @apiResource App\Http\Resources\Api\V1\SiteResource
     * @apiResourceModel App\Models\Site with=pages
     */
    public function show(Site $site)
    {
        return new SiteResource($site);
    }

    /**
     * Update Site
     *
     * Update the specified site.
     * @apiResource App\Http\Resources\Api\V1\SiteResource
     * @apiResourceModel App\Models\Site
     */
    public function update(UpdateSiteRequest $request, Site $site)
    {
        $site->update($request->validated());
        return new SiteResource($site);
    }

    /**
     * Delete Site
     *
     * Remove the specified site.
     * @response 204
     */
    public function destroy(Site $site)
    {
        $site->delete();
        return response()->noContent();
    }
}
