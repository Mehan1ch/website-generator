import type {KubernetesObjectApi} from "@kubernetes/client-node";
import {ingressRequest} from "./ingress.request.js";
import type {IngressResource} from "./ingress.type.js";
import {objectsApi} from "../api/api.module.js";

class IngressService {
    constructor(private readonly api: KubernetesObjectApi) {
    }

    //Traefik gateway api is a custom object
    createIngress = async (resource: IngressResource) => {
        const createIngressRequest = ingressRequest.createIngressRequest(resource);
        return await this.api.create(createIngressRequest);
    };

    deleteIngress = async (resource: IngressResource) => {
        const deleteIngressRequest = ingressRequest.deleteIngressRequest(resource);
        return await this.api.delete(deleteIngressRequest);
    };
}

export const ingressService = new IngressService(objectsApi);
