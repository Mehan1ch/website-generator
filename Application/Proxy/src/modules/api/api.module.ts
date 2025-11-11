import {AppsV1Api, CoreV1Api, KubeConfig, NetworkingV1Api} from '@kubernetes/client-node';

const kc = new KubeConfig();
kc.loadFromDefault();

export const appsApi = kc.makeApiClient(AppsV1Api);
export const coreApi = kc.makeApiClient(CoreV1Api);
export const netApi = kc.makeApiClient(NetworkingV1Api);