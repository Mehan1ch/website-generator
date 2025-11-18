<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\SiteDeploymentError;
use App\Models\Site;
use App\Services\DeploymentService;

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
     * Store site deployment.
     *
     * Initiate a new deployment for the specified site.
     * @response 200 {
     *     "message": "Deployment created successfully.",
     * }
     * @responsse 400 {
     *     "message": "Failed to create deployment.",
     *     "error": "Detailed error information."
     * }
     *
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
     * Get site deployment.
     *
     * Get the deployment status of the specified site.
     * @response 200 {
     *     apiVersion: "1.0",
     *     kind: "deployment",
     *     metadata: {}
     *     spec: {}
     *     status: {}
     * }
     * @responsse 400 {
     *     "message": "Failed to fetch deployment.",
     *     "error": "Detailed error information."
     * }
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
     * Update site deployment.
     *
     * Update the deployment of the specified site.
     * @response 200 {
     *     "message": "Deployment updated successfully.",
     * }
     * @responsse 400 {
     *     "message": "Failed to update deployment.",
     *     "error": "Detailed error information."
     * }
     */
    public function update(Site $site)
    {
        $response = $this->deploymentService->update($site);
        if ($response instanceof SiteDeploymentError) {
            return response($response, 400);
        }
        return response($response, 200);
    }

    /**
     * Delete site deployment.
     *
     * Delete the deployment of the specified site.
     * @response 204 {
     *     "message": "Deployment deleted successfully.",
     * }
     * @responsse 400 {
     *     "message": "Failed to delete deployment.",
     *     "error": "Detailed error information."
     * }
     */
    public function destroy(Site $site)
    {
        $response = $this->deploymentService->destroy($site);
        if ($response instanceof SiteDeploymentError) {
            return response($response, 400);
        }
        return response($response, 204);
    }

    /**
     * Restart site deployment.
     *
     * Restart the deployment of the specified site.
     * @response 200 {
     *     "message": "Deployment restarted successfully.",
     * }
     * @responsse 400 {
     *     "message": "Failed to restart deployment.",
     *     "error": "Detailed error information."
     * }
     */
    public function restart(Site $site)
    {
        $response = $this->deploymentService->restart($site);
        if ($response instanceof SiteDeploymentError) {
            return response($response, 400);
        }
        return response($response, 200);
    }
}
