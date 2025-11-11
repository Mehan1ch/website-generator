import {type AppsV1Api} from "@kubernetes/client-node";
import type {DefaultResource} from "../../types/types.js";
import {appsApi} from "../api/api.module.js";
import {deploymentRequest} from "./deployment.request.js";
import type {DeploymentResource} from "./deployment.type.js";

class DeploymentService {
    constructor(private readonly api: AppsV1Api) {
    }

    readDeployment = async (resource: DefaultResource) => {
        const readDeploymentRequest = deploymentRequest.readDeploymentRequest(resource);
        return await this.api.readNamespacedDeployment(readDeploymentRequest);
    };

    createDeployment = async (resource: DeploymentResource) => {
        const createDeploymentRequest = deploymentRequest.createDeploymentRequest(resource);
        return await this.api.createNamespacedDeployment(createDeploymentRequest);
    };

    updateDeployment = async (resource: DeploymentResource) => {
        const updateDeploymentRequest = deploymentRequest.updateDeploymentRequest(resource);
        return await this.api.replaceNamespacedDeployment(updateDeploymentRequest);
    };

    deleteDeployment = async (resource: DefaultResource) => {
        const deleteDeploymentRequest = deploymentRequest.deleteDeploymentRequest(resource);
        return await this.api.deleteNamespacedDeployment(deleteDeploymentRequest);
    };

    restartDeployment = async (resource: DefaultResource) => {
        const patchNamespacedDeploymentRequest = deploymentRequest.restartDeploymentRequest(resource);
        return await this.api.patchNamespacedDeployment(patchNamespacedDeploymentRequest);
    };
}

export const deploymentService = new DeploymentService(appsApi);