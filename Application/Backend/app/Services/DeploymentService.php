<?php

namespace App\Services;

use App\Http\Resources\Api\V1\SiteDeploymentError;
use App\Http\Resources\Api\V1\SiteDeploymentResource;
use App\Http\Resources\Api\V1\SiteDeploymentResponse;
use App\Models\Site;
use App\States\Draft;
use App\States\Published;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Spatie\ModelStates\Exceptions\CouldNotPerformTransition;

//TODO: app.css is not being included in the deployment payload. Fix this.
class DeploymentService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Return the deployment status for a site.
     *
     * @param Site $site
     * @return SiteDeploymentError|SiteDeploymentResponse
     */
    public static function show(Site $site): SiteDeploymentError|SiteDeploymentResponse
    {
        $path = DeploymentService::buildPath("/deployment/{namespace}/$site->subdomain");
        return DeploymentService::makeRequest(fn() => Http::get($path));
    }

    /**
     * Deploy the site.
     *
     * @param Site $site
     * @return SiteDeploymentError|SiteDeploymentResponse
     */
    public static function store(Site $site): SiteDeploymentError|SiteDeploymentResponse
    {
        $path = DeploymentService::buildPath("/deployment");
        Log::info("Deployment path: " . $path);
        $siteResource = new SiteDeploymentResource($site);
        if ($siteResource->pages->isEmpty()) {
            return new SiteDeploymentError((object)[
                'message' => 'Site has no pages to deploy.',
                'error' => ['No pages found for deployment.'],
            ]);
        }
        Log::info("Deployment resource: " . $siteResource->toPrettyJson());
        return DeploymentService::deployWithStateTransition($site, fn() => Http::post($path, $siteResource), Published::class);
    }

    /**
     * Update the deployment for a site.
     *
     * @param Site $site
     * @return SiteDeploymentError|SiteDeploymentResponse
     */
    public static function update(Site $site): SiteDeploymentError|SiteDeploymentResponse
    {
        $path = DeploymentService::buildPath("/deployment");
        $siteResource = new SiteDeploymentResource($site);
        if ($siteResource->pages->isEmpty()) {
            return new SiteDeploymentError((object)[
                'message' => 'Site has no pages to deploy.',
                'error' => ['No pages found for deployment.'],
            ]);
        }
        return DeploymentService::deployWithStateTransition($site, fn() => Http::put($path, $siteResource), Published::class);
    }

    /**
     * Delete the deployment for a site.
     *
     * @param Site $site
     * @return SiteDeploymentError|SiteDeploymentResponse
     */
    public static function destroy(Site $site): SiteDeploymentError|SiteDeploymentResponse
    {
        $path = DeploymentService::buildPath("/deployment/{namespace}/$site->subdomain");
        return DeploymentService::deployWithStateTransition($site, fn() => Http::delete($path), Draft::class);
    }

    /**
     * Restart the deployment for a site.
     *
     * @param Site $site
     * @return SiteDeploymentError|SiteDeploymentResponse
     */
    public static function restart(Site $site): SiteDeploymentError|SiteDeploymentResponse
    {
        $path = DeploymentService::buildPath("/deployment/{namespace}/$site->subdomain/restart");
        return DeploymentService::makeRequest(fn() => Http::post($path));
    }

    /**
     * Build the full URL path for the deployment service.
     *
     * @param string $path
     * @return string
     */
    private static function buildPath(string $path): string
    {
        $namespace = config('app.kube_namespace');
        $baseUrl = config('app.kube_proxy_url');

        return $baseUrl . str_replace('{namespace}', $namespace, $path);
    }

    /**
     * Make the HTTP request and handle errors.
     *
     * @param callable $requestCallback
     * @return SiteDeploymentError|SiteDeploymentResponse
     */
    private static function makeRequest(callable $requestCallback): SiteDeploymentError|SiteDeploymentResponse
    {
        try {
            $response = $requestCallback();
            Log::info("Deployment request response: " . $response);

            if ($response->failed()) {
                return new SiteDeploymentError((object)$response->json());
            }

            return new SiteDeploymentResponse((object)$response->json());
        } catch (ConnectionException $e) {
            Log::info("Deployment connection error: " . $e->getMessage());
            return new SiteDeploymentError((object)[
                'message' => 'Could not connect to deployment server.',
                'error' => [$e->getMessage()],
            ]);
        }
    }

    /**
     * Deploy with state transition.
     *
     * @param Site $site
     * @param callable $requestCallback
     * @param class-string $state
     * @return SiteDeploymentError|SiteDeploymentResponse
     */
    private static function deployWithStateTransition(Site $site, callable $requestCallback, string $state): SiteDeploymentError|SiteDeploymentResponse
    {
        if (!$site->state->canTransitionTo($state)) {
            return new SiteDeploymentError((object)[
                'message' => 'Site is not in a state that allows deployment.',
                'error' => ["Cannot transition from {$site->state} to $state."],
            ]);
        }


        $response = DeploymentService::makeRequest($requestCallback);

        Log::info("Deployment response received for site ID: $site->id, response:" . $response->toJson());

        if ($response instanceof SiteDeploymentError) {
            return $response;
        }

        if ($state == Draft::class) {
            $site->published_at = null;// set published_at to null when removing deployment,
            $site->save();
        };

        try {
            $site->state->transitionTo($state);
        } catch (CouldNotPerformTransition $e) {
            // We should never reach here because of the earlier check, but just in case
            return new SiteDeploymentError((object)[
                'message' => 'Site is not in a state that allows deployment.',
                'error' => [$e->getMessage()],
            ]);
        }

        Log::info("Site state transitioned to $state for $site->id, check: $site->state");

        return $response;
    }
}
