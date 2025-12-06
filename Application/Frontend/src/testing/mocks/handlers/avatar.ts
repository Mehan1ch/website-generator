import {openApiHttp} from "@/testing/utils/openApiHttp.ts";

export const uploadAvatarHandler = openApiHttp.post("/api/v1/avatar", async ({response}) => {
    return response(201).json({
        message: "Avatar uploaded successfully",
    });
});

export const deleteAvatarHandler = openApiHttp.delete("/api/v1/avatar", async ({response}) => {
    return response(204).json({});
});