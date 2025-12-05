import {openApiHttp} from "@/testing/utils/openApiHttp.ts";
import {createDashboardResponse} from "@/testing/mocks/factories/dashboard.ts";

export const getDashboardHandler = openApiHttp.get("/api/v1/dashboard", async ({response}) => {
    return response(200).json(createDashboardResponse());
});