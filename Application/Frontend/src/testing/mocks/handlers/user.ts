import {openApiHttp} from "@/testing/utils/openApiHttp.ts";
import {createUser} from "@/testing/mocks/factories/user.ts";

export const getUserHandler = openApiHttp.get("/api/v1/user", async ({response}) => {
    return response(200).json({
        data: createUser()
    });
});

export const deleteUserHandler = openApiHttp.delete("/api/v1/user", async ({response}) => {
    return response(204).text("");
});