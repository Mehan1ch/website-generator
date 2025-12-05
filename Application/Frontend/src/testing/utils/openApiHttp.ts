import {createOpenApiHttp} from "openapi-msw";
import type {paths} from "@/lib/api/v1";

export const openApiHttp = createOpenApiHttp<paths>();