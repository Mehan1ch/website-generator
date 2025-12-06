import {openApiHttp} from "@/testing/utils/openApiHttp.ts";

export const csrfHandler = openApiHttp.get('/sanctum/csrf-cookie', async ({response}) => {
    return response(204).json(null, {
        headers: {
            'Set-Cookie': 'XSRF-TOKEN=mock-csrf-token',
        },
    });
});