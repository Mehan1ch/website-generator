import {openApiHttp} from "@/testing/utils/openApiHttp.ts";
import {createSite, createSiteCollectionResponse} from "@/testing/mocks/factories/site.ts";

export const getSitesHandler = openApiHttp.get("/api/v1/site", async ({request, response}) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    return response(200).json(createSiteCollectionResponse(5, page));
});

export const createSiteHandler = openApiHttp.post("/api/v1/site", async ({response}) => {
    return response(201).json({
        data: createSite(),
    });
});

export const getSiteHandler = openApiHttp.get("/api/v1/site/{site_id}", async ({response}) => {
    return response(200).json({
        data: createSite(),
    });
});

export const updateSiteHandler = openApiHttp.put("/api/v1/site/{site_id}", async ({response}) => {
    return response(200).json({
        data: createSite(),
    });
});

export const deleteSiteHandler = openApiHttp.delete("/api/v1/site/{site_id}", async ({response}) => {
    return response(204).json({});
});

export const getSiteDeploymentHandler = openApiHttp.get("/api/v1/site/{site_id}/deployment", async ({response}) => {
    return response(200).json({
        message: {}
    });
});

export const deploySiteHandler = openApiHttp.post("/api/v1/site/{site_id}/deployment", async ({response}) => {
    return response(201).json({
        message: "Deployment created successfully",
    });
});

export const updateSiteDeploymentHandler = openApiHttp.put("/api/v1/site/{site_id}/deployment", async ({response}) => {
    return response(200).json({
        message: "Deployment updated successfully",
    });
});

export const deleteSiteDeploymentHandler = openApiHttp.delete("/api/v1/site/{site_id}/deployment", async ({response}) => {
    return response(204).json({
        message: "Deployment deleted successfully",
    });
});

export const restartSiteDeploymentHandler = openApiHttp.post("/api/v1/site/{site_id}/deployment/restart", async ({response}) => {
    return response(200).json({
        message: "Deployment restarted successfully",
    });
});