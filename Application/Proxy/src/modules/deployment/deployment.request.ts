import type {DefaultResource} from "../../types/types.js";
import {
    type AppsV1ApiCreateNamespacedDeploymentRequest,
    type AppsV1ApiDeleteNamespacedDeploymentRequest,
    type AppsV1ApiPatchNamespacedDeploymentRequest,
    type AppsV1ApiReadNamespacedDeploymentRequest,
    type AppsV1ApiReplaceNamespacedDeploymentRequest,
    V1Container,
    V1Deployment,
    V1DeploymentSpec,
    V1ObjectMeta,
    V1PodSpec,
    V1PodTemplateSpec
} from "@kubernetes/client-node";
import type {DeploymentResource} from "./deployment.type.js";


class DeploymentRequest {

    constructor() {
    }

    readDeploymentRequest = (resource: DefaultResource): AppsV1ApiReadNamespacedDeploymentRequest => {
        return {
            name: resource.name,
            namespace: resource.namespace || "default"
        };
    };

    createDeploymentRequest = (resource: DeploymentResource): AppsV1ApiCreateNamespacedDeploymentRequest => {
        const awsUrl = process.env.AWS_URL || "http://host.docker.internal:9000/laravel";
        const pagesEnvValue = resource.pages.map(p => `${p.path}|${awsUrl + p.htmlUrl}`).join("\n");

        return {
            body: {
                apiVersion: "apps/v1",
                kind: "Deployment",
                metadata: {
                    name: resource.name,
                    labels: {
                        app: resource.name
                    }
                },
                spec: {
                    replicas: 1,
                    revisionHistoryLimit: 10,
                    selector: {
                        matchLabels: {
                            app: resource.name
                        }
                    },
                    template: {
                        metadata: {
                            labels: {
                                app: resource.name
                            }
                        } as V1ObjectMeta,
                        spec: {
                            volumes: [
                                {name: "site-data", emptyDir: {}},
                                {
                                    name: "site-assets", configMap: {
                                        name: process.env.CSS_CONFIGMAP_NAME || "css-configmap"
                                    }
                                }
                            ],
                            initContainers: [
                                {
                                    name: "fetch-pages",
                                    image: "curlimages/curl:8.2.1",
                                    env: [
                                        {name: "PAGES", value: pagesEnvValue}
                                    ],
                                    command: ["sh", "-c"],
                                    args: [
                                        'IFS=$\'\\n\'; ' +
                                        'for entry in $PAGES; do ' +
                                        '  path="${entry%%|*}"; url="${entry#*|}"; ' +
                                        '  if [ "$path" = "/" ] || [ -z "$path" ]; then dest="/site/index.html"; else dest="/site${path%/}/index.html"; fi; ' +
                                        '  mkdir -p "$(dirname "$dest")"; ' +
                                        '  echo "fetching $url -> $dest"; ' +
                                        '  curl -fsSL "$url" -o "$dest" || echo "warning: failed to fetch $url"; ' +
                                        'done'
                                    ],
                                    volumeMounts: [
                                        {name: "site-data", mountPath: "/site"}
                                    ]
                                }
                            ] as V1Container[],
                            containers: [
                                {
                                    name: resource.name,
                                    image: "nginx:alpine",
                                    ports: [{containerPort: 80}],
                                    volumeMounts: [
                                        {name: "site-data", mountPath: "/usr/share/nginx/html"}
                                    ]
                                }
                            ] as V1Container[]
                        } as V1PodSpec
                    } as V1PodTemplateSpec
                } as V1DeploymentSpec
            } as V1Deployment,
            namespace: resource.namespace || "default"
        };
    };

    updateDeploymentRequest = (options: DeploymentResource): AppsV1ApiReplaceNamespacedDeploymentRequest => {
        return this.createDeploymentRequest(options) as AppsV1ApiReplaceNamespacedDeploymentRequest;
    };

    deleteDeploymentRequest = (resource: DefaultResource): AppsV1ApiDeleteNamespacedDeploymentRequest => {
        return {
            name: resource.name,
            namespace: resource.namespace || "default",
        };
    };

    restartDeploymentRequest = (resource: DefaultResource): AppsV1ApiPatchNamespacedDeploymentRequest => {
        return {
            name: resource.name,
            namespace: resource.namespace || "default",
            body: {
                spec: {
                    template: {
                        metadata: {
                            annotations: {
                                "kubectl.kubernetes.io/restartedAt": new Date().toISOString()
                            }
                        }
                    }
                }
            }
        };
    };
}

export const deploymentRequest = new DeploymentRequest();