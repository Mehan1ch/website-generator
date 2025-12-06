<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\States\Draft;
use App\States\Published;

/**
 * Dashboard Controller
 *
 * Handles returning dashboard information.
 *
 * @group Dashboard
 *
 * @authenticated
 */
class DashboardController extends Controller
{
    /**
     * Get Dashboard Info
     *
     * Display dashboard information including site counts, page counts, and recent activity.
     *
     * @response 200 {
     *   "data": {
     *     "total_sites": 5,
     *     "published_sites": 3,
     *     "draft_sites": 2,
     *     "total_pages": 12,
     *     "recent_activity": {
     *       "name": "My Blog",
     *       "updated_at": "2 hours ago"
     *     },
     *     "latest_site": {
     *       "name": "Portfolio",
     *       "created_at": "1 day ago"
     *     }
     *   }
     * }
     */
    public function index()
    {
        $user = auth()->user();

        $totalSites = $user->sites()->count();
        $totalPages = $user->sites()->withCount('pages')->get()->sum('pages_count');

        $publishedSites = $user->sites()->whereState('state', Published::class)->count();
        $draftSites = $user->sites()->whereState('state', Draft::class)->count();

        $recentSite = $user->sites()->latest('updated_at')->first();

        $latestSite = $user->sites()->latest()->first();

        return response()->json([
            'data' => [
                'total_sites' => $totalSites,
                'published_sites' => $publishedSites,
                'draft_sites' => $draftSites,
                'total_pages' => $totalPages,
                'recent_activity' => $recentSite ? [
                    'name' => $recentSite->name,
                    'updated_at' => $recentSite->updated_at->diffForHumans(),
                ] : null,
                'latest_site' => $latestSite ? [
                    'name' => $latestSite->name,
                    'created_at' => $latestSite->created_at->diffForHumans(),
                ] : null,
            ],
        ], "200");
    }
}
