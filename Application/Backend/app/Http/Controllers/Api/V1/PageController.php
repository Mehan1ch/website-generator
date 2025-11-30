<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\StorePageRequest;
use App\Http\Requests\Api\V1\UpdatePageRequest;
use App\Http\Resources\Api\V1\Collections\PageCollection;
use App\Http\Resources\Api\V1\PageResource;
use App\Models\Page;
use App\Models\Site;
use App\Services\HTMLSanitizerService;
use Illuminate\Http\Request;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig;

/**
 * Page Controller
 *
 * Handles page-related operations such as creating, viewing, updating, and deleting pages.
 * @group Pages
 * @authenticated
 */
class PageController extends Controller
{
    public function __construct(protected HTMLSanitizerService $htmlSanitizerService)
    {
    }

    /**
     * Get Pages for a Site
     *
     * Display all Pages for the given Site.
     * @queryParam page integer The page number. Example: 1
     * @apiResourceCollection App\Http\Resources\Api\V1\Collections\PageCollection
     * @apiResourceModel App\Models\Page paginate=15
     * @queryParam page integer The page number. Example: 1
     * @queryParam per_page integer Number of items per page. Defaults to 15.
     */
    public function index(Request $request, Site $site)
    {
        $perPage = (int)$request->query('per_page', 15);
        $perPage = max(1, min($perPage, 100));
        return new Pagecollection(Page::query()->where('site_id', $site->id)->paginate($perPage));
    }

    /**
     * Create Page for Site
     *
     * Store a newly created page for a specific site.
     * @apiResource App\Http\Resources\Api\V1\PageResource status=201
     * @apiResourceModel App\Models\Page
     */
    public function store(StorePageRequest $request, Site $site)
    {
        $validated = $request->validated();
        /** @var Page $page */
        $page = $site->pages()->make($validated);

        if ($validated["html"] !== null) {
            $uncompressed = gzinflate(base64_decode($validated["html"]));
            $sanitized = $this->htmlSanitizerService->sanitize($uncompressed, $validated["title"]);
            try {
                $page->addMediaFromString($sanitized)
                    ->setFileName($page->url . '.html')
                    ->toMediaCollection('static_html');
            } catch (FileDoesNotExist|FileIsTooBig $e) {
                return response()->json(['message' => 'Failed to save static HTML content.'], 500);
            }
        }
        $page->save();

        return response()->json(new PageResource($page), 201);
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
    public function update(UpdatePageRequest $request, Site $site, Page $page)
    {
        if (!$site->pages->contains($page)) {
            return response([
                'message' => 'Page not found for the specified site.'
            ], 404);
        }

        $validated = $request->validated();
        /** @var Page $page */
        $page = $site->pages()->update($validated);

        if ($validated["html"] !== null) {
            $uncompressed = gzinflate(base64_decode($validated["html"]));
            $sanitized = $this->htmlSanitizerService->sanitize($uncompressed, $validated["title"]);
            try {
                $page->addMediaFromString($sanitized)
                    ->setFileName($page->url . '.html')
                    ->toMediaCollection('static_html');
            } catch (FileDoesNotExist|FileIsTooBig $e) {
                return response()->json(['message' => 'Failed to save static HTML content.'], 500);
            }
        }
        $page->save();


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
