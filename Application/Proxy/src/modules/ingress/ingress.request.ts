import type {DefaultResource} from "../../types/types.js";
import type {IngressResource} from "./ingress.type.js";


class IngressRequest {
    constructor() {
    }

    createIngressRequest = (resource: IngressResource) => {
        const host = `${resource.subDomain}.${resource.domain}`;

        return {
            apiVersion: "gateway.networking.k8s.io/v1",
            kind: "HTTPRoute",
            metadata: {
                name: resource.name,
                namespace: resource.namespace || "default",
                labels: {
                    app: resource.name
                }
            },
            spec: {
                parentRefs: [
                    {
                        name: "traefik-gateway"
                    }
                ],
                hostnames: [host],
                rules: [
                    {
                        matches: [
                            {
                                path: {
                                    type: "PathPrefix",
                                    value: "/"
                                }
                            }
                        ],
                        backendRefs: [
                            {
                                name: resource.name,
                                port: 80
                            }
                        ]
                    }
                ]
            }
        };
    };

    deleteIngressRequest = (resource: DefaultResource) => {
        return {
            apiVersion: "gateway.networking.k8s.io/v1",
            kind: "HTTPRoute",
            metadata: {
                name: resource.name,
                namespace: resource.namespace || "default",
                labels: {
                    app: resource.name
                }
            },
        };
    };
}

export const ingressRequest = new IngressRequest();