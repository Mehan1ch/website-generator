import {openApiHttp} from "@/testing/utils/openApiHttp.ts";
import {createSchema, createSchemaCollectionResponse} from "@/testing/mocks/factories/schema.ts";
import {SchemaState} from "@/types/schema.ts";

export const getSchemasHandler = openApiHttp.get("/api/v1/schema", async ({request, response}) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    return response(200).json(createSchemaCollectionResponse(5, page));
});

export const createSchemaHandler = openApiHttp.post("/api/v1/schema", async ({response}) => {
    return response(201).json({
        data: createSchema(),
    });
});

export const getSchemaHandler = openApiHttp.get("/api/v1/schema/{schema_id}", async ({response}) => {
    return response(200).json({
        data: createSchema(),
    });
});

export const updateSchemaHandler = openApiHttp.put("/api/v1/schema/{schema_id}", async ({response}) => {
    return response(200).json({
        data: createSchema(),
    });
});

export const deleteSchemaHandler = openApiHttp.delete("/api/v1/schema/{schema_id}", async ({response}) => {
    return response(204).json({});
});

export const publishSchemaHandler = openApiHttp.post("/api/v1/schema/{schema_id}/publish", async ({response}) => {
    return response(200).json({
        data: createSchema({state: 'published' as SchemaState}),
    });
});