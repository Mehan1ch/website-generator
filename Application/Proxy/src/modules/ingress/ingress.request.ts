import type {DefaultResource} from "../../types/types.js";
import {
    type NetworkingV1ApiCreateNamespacedIngressRequest,
    type NetworkingV1ApiDeleteNamespacedIngressRequest,
    V1Ingress,
    V1IngressSpec
} from "@kubernetes/client-node";
import type {IngressResource} from "./ingress.type.js";


class IngressRequest {
    constructor() {
    }

    createIngressRequest = (resource: IngressResource): NetworkingV1ApiCreateNamespacedIngressRequest => {
        const host = `${resource.subDomain}.${resource.domain}`;

        return {
            body: {
                apiVersion: "traefik.io/v1alpha1",
                kind: "IngressRoute",
                metadata: {
                    name: resource.name,
                },
                spec: {
                    entryPoints: ["web"],
                    routes: [
                        {
                            match: 'Host(`' + host + '`)',
                            kind: "Rule",
                            services: [
                                {
                                    name: resource.name,
                                    port: 80,
                                }
                            ]
                        }
                    ]
                } as V1IngressSpec
            } as V1Ingress,
            namespace: "default"
        };
    };

    deleteIngressRequest = (resource: DefaultResource): NetworkingV1ApiDeleteNamespacedIngressRequest => {
        return {
            name: resource.name,
            namespace: resource.namespace || "default"
        };
    };
}

export const ingressRequest = new IngressRequest();