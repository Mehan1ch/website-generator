import type {Page} from "../../types/types.js";

export type SiteDeploymentBody = {
    name: string;
    domain: string;
    subDomain: string;
    pages: Page[];
    namespace?: string;
}
