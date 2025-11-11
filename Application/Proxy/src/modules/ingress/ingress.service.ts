import type {NetworkingV1Api} from "@kubernetes/client-node";
import {ingressRequest} from "./ingress.request.js";
import {netApi} from "../api/api.module.js";
import type {IngressResource} from "./ingress.type.js";

class IngressService {
    constructor(private readonly api: NetworkingV1Api) {
    }

    createIngress = async (resource: IngressResource) => {
        const createIngressRequest = ingressRequest.createIngressRequest(resource);
        return await this.api.createNamespacedIngress(createIngressRequest);
    };

    deleteIngress = async (resource: IngressResource) => {
        const deleteIngressRequest = ingressRequest.deleteIngressRequest(resource);
        return await this.api.deleteNamespacedIngress(deleteIngressRequest);
    };
}

export const ingressService = new IngressService(netApi);
