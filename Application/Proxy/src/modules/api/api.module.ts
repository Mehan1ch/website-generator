import {AppsV1Api, CoreV1Api, CustomObjectsApi, KubeConfig, KubernetesObjectApi} from '@kubernetes/client-node';

const kc = new KubeConfig();
kc.loadFromDefault();

export const appsApi = kc.makeApiClient(AppsV1Api);
export const coreApi = kc.makeApiClient(CoreV1Api);
export const customObjectsApi = kc.makeApiClient(CustomObjectsApi);

export const objectsApi = kc.makeApiClient(KubernetesObjectApi);
