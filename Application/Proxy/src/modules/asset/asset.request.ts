import {type CoreV1ApiCreateNamespacedConfigMapRequest, V1ConfigMap} from "@kubernetes/client-node";
import * as fs from "node:fs";

class AssetRequest {
    constructor() {
    }

    createSiteAssetsConfigMapRequest = (namespace?: string): CoreV1ApiCreateNamespacedConfigMapRequest => {
        const cssPath = "src/assets/index.css";
        const cssContent = fs.readFileSync(cssPath, "utf8");
        return {
            namespace: namespace || "default",
            body: {
                apiVersion: "v1",
                kind: "ConfigMap",
                metadata: {
                    name: process.env.CSS_CONFIGMAP_NAME || "css-configmap",
                    labels: {
                        app: process.env.CSS_CONFIGMAP_NAME || "css-configmap"
                    }
                },
                data: {
                    "index.css": cssContent
                }
            } as V1ConfigMap
        };
    };
}

export const assetRequest = new AssetRequest();