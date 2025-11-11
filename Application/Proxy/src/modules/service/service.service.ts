import type {CoreV1Api} from "@kubernetes/client-node";
import type {DefaultResource} from "../../types/types.js";
import {serviceRequest} from "./service.request.js";
import {coreApi} from "../api/api.module.js";

class ServiceService {
    constructor(private readonly api: CoreV1Api) {
    }

    createService = async (resource: DefaultResource) => {
        const createServiceRequest = serviceRequest.createServiceRequest(resource);
        return await this.api.createNamespacedService(createServiceRequest);
    };

    deleteService = async (resource: DefaultResource) => {
        const deleteServiceRequest = serviceRequest.deleteServiceRequest(resource);
        return await this.api.deleteNamespacedService(deleteServiceRequest);
    };
}

export const serviceService = new ServiceService(coreApi);