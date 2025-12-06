import {openApiHttp} from "@/testing/utils/openApiHttp.ts";
import {createPageCollectionResponse, createPageResponse} from "@/testing/mocks/factories/page.ts";

export const getPagesForSiteHandler = openApiHttp.get("/api/v1/site/{site_id}/page", async ({request, response}) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    return response(200).json(createPageCollectionResponse(5, page));
});

export const createPageHandler = openApiHttp.post("/api/v1/site/{site_id}/page", async ({response}) => {
    return response(201).json(createPageResponse());
});

export const getPageHandler = openApiHttp.get("/api/v1/site/{site_id}/page/{page_id}", async ({response}) => {
    return response(200).json(createPageResponse());
});

export const updatePageHandler = openApiHttp.put("/api/v1/site/{site_id}/page/{page_id}", async ({response}) => {
    return response(200).json(createPageResponse());
});

export const deletePageHandler = openApiHttp.delete("/api/v1/site/{site_id}/page/{page_id}", async ({response}) => {
    return response(204).json({});
});

