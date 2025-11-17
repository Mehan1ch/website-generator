<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\SiteDeploymentError;
use App\Models\Site;
use App\Services\DeploymentService;
use Illuminate\Http\Request;

/**
 * Deployment Controller
 *
 * Handles deployment-related operations such as initiating, viewing, updating, deleting, and restarting deployments for sites.
 * @group Deployments
 * @authenticated
 */
class DeploymentController extends Controller
{

    /**
     * Create a new controller instance.
     */
    public function __construct(
        protected DeploymentService $deploymentService,
    )
    {
    }

    /**
     * Initiate a new deployment for the specified site.
     *
     * @apiResource App\Http\Resources\Api\V1\SiteDeploymentError
     * @apiResource App\Http\Resources\Api\V1\SiteDeploymentResponse
     */
    public function store(Site $site)
    {
        $response = $this->deploymentService->store($site);
        if ($response instanceof SiteDeploymentError) {
            return response($response, 400);
        }
        return response($response, 201);
    }


    /**
     * Retrieve the deployment status for the specified site.
     *
     * @apiResource App\Http\Resources\Api\V1\SiteDeploymentError
     * @apiResource App\Http\Resources\Api\V1\SiteDeploymentResponse
     */
    public function show(Site $site)
    {
        $response = $this->deploymentService->show($site);
        if ($response instanceof SiteDeploymentError) {
            return response($response, 400);
        }
        return response($response, 200);
    }

    /**
     * Restart the deployment for the specified site.
     *
     * @apiResource App\Http\Resources\Api\V1\SiteDeploymentError
     * @apiResource App\Http\Resources\Api\V1\SiteDeploymentResponse
     */
    public function update(Request $request, Site $site)
    {
        $response = $this->deploymentService->update($site);
        if ($response instanceof SiteDeploymentError) {
            return response($response, 400);
        }
        return response($response, 200);
    }

    /**
     * Delete the deployment.
     *
     * @apiResource App\Http\Resources\Api\V1\SiteDeploymentError
     * @apiResource App\Http\Resources\Api\V1\SiteDeploymentResponse
     */
    public function destroy(Site $site)
    {
        $response = $this->deploymentService->destroy($site);
        if ($response instanceof SiteDeploymentError) {
            return response($response, 400);
        }
        return response($response, 200);
    }

    /**
     * Restart the deployment.
     *
     * Restart the deployment of the specified site.
     * @apiResource App\Http\Resources\Api\V1\SiteDeploymentError
     * @apiResource App\Http\Resources\Api\V1\SiteDeploymentResponse
     */
    public function restart(Request $request, Site $site)
    {
        $response = $this->deploymentService->restart($site);
        if ($response instanceof SiteDeploymentError) {
            return response($response, 400);
        }
        return response($response, 200);
    }
}
