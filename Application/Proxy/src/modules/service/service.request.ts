import type {
    CoreV1ApiCreateNamespacedServiceRequest,
    CoreV1ApiDeleteNamespacedServiceRequest,
    V1Service,
    V1ServiceSpec
} from "@kubernetes/client-node";
import type {DefaultResource} from "../../types/types.js";

class ServiceRequest {
    constructor() {
    }

    createServiceRequest = (resource: DefaultResource): CoreV1ApiCreateNamespacedServiceRequest => {
        return {
            body: {
                apiVersion: "v1",
                kind: "Service",
                metadata: {
                    name: resource.name,
                },
                spec: {
                    selector: {
                        app: resource.name
                    },
                    ports: [
                        {
                            port: 80,
                        }
                    ],
                } as V1ServiceSpec
            } as V1Service,
            namespace: resource.namespace || "default"
        } as CoreV1ApiCreateNamespacedServiceRequest;
    };

    deleteServiceRequest = (resource: DefaultResource): CoreV1ApiDeleteNamespacedServiceRequest => {
        return {
            name: resource.name,
            namespace: resource.namespace || "default"
        };
    };
}

export const serviceRequest = new ServiceRequest();