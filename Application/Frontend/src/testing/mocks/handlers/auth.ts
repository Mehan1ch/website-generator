import {openApiHttp} from "@/testing/utils/openApiHttp.ts";

export const loginHandler = openApiHttp.post("/login", async ({response}) => {
    return response(200).json({});
},);

export const logoutHandler = openApiHttp.post("/logout", async ({response}) => {
    return response(204).json({});
});

export const registerHandler = openApiHttp.post("/register", async ({response}) => {
    return response(201).json({});
});