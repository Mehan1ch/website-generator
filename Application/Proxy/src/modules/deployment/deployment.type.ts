import type {Page} from "../../types/types.js";

export type DeploymentResource = {
    name: string;
    pages: Page[];
    namespace?: string;
};
