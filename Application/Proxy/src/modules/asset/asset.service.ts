import type {CoreV1Api} from "@kubernetes/client-node";
import {coreApi} from "../api/api.module.js";
import {assetRequest} from "./asset.request.js";

class AssetService {

    constructor(private readonly api: CoreV1Api) {
    }

    ensureSiteAssetsConfigMapExists = async (namespace?: string) => {
        try {
            return await this.api.readNamespacedConfigMap({
                name: process.env.CSS_CONFIGMAP_NAME || "css-configmap",
                namespace: namespace || "default"
            });
        } catch {
            const configMapRequest = assetRequest.createSiteAssetsConfigMapRequest(namespace);
            return await this.api.createNamespacedConfigMap(configMapRequest);
        }
    };
}

export const assetService = new AssetService(coreApi);