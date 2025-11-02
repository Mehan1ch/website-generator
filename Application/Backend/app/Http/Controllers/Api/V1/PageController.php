<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\PageRequest;
use App\Http\Resources\Api\V1\PageResource;
use App\Models\Page;
use App\Models\Site;

/**
 * Page Controller
 *
 * Handles page-related operations such as creating, viewing, updating, and deleting pages.
 * @group Pages
 * @authenticated
 */
class PageController extends Controller
{
    /**
     * Create Page for Site
     *
     * Store a newly created page for a specific site.
     * @apiResource App\Http\Resources\Api\V1\PageResource status=201
     * @apiResourceModel App\Models\Page
     */
    public function store(PageRequest $request, Site $site)
    {
        $site->pages()->create($request->validated());
        return response()->json(new PageResource($site), 201);
    }

    /**
     * Get Page for Site
     *
     * Display the specified page for a specific site.
     * @apiResource App\Http\Resources\Api\V1\PageResource
     * @apiResourceModel App\Models\Page
     * @response 404 {
     *   "message": "Page not found for the specified site."
     * }
     */
    public function show(Site $site, Page $page)
    {
        if (!$site->pages->contains($page)) {
            return response([
                'message' => 'Page not found for the specified site.'
            ], 404);
        }
        return new PageResource($page);
    }

    /**
     * Update Page for Site
     *
     * Update the specified page for a specific site.
     * @apiResource App\Http\Resources\Api\V1\PageResource
     * @apiResourceModel App\Models\Page
     * @response 404 {
     *  "message": "Page not found for the specified site."
     * }
     */
    public function update(PageRequest $request, Site $site, Page $page)
    {
        if (!$site->pages->contains($page)) {
            return response([
                'message' => 'Page not found for the specified site.'
            ], 404);
        }
        $page->update($request->validated());
        return new PageResource($page);
    }

    /**
     * Delete Page for Site
     *
     * Remove the specified page from a specific site.
     * @response 204
     */
    public function destroy(Site $site, Page $page)
    {
        if (!$site->pages->contains($page)) {
            return response([
                'message' => 'Page not found for the specified site.'
            ], 404);
        }
        $page->delete();
        return response()->noContent();
    }
}
