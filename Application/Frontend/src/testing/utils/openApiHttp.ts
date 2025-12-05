import {createOpenApiHttp} from "openapi-msw";
import type {paths} from "@/lib/api/v1";

const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost";
export const openApiHttp = createOpenApiHttp<paths>({
    baseUrl: baseUrl,
});