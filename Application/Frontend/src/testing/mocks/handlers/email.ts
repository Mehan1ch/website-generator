import {openApiHttp} from "@/testing/utils/openApiHttp.ts";

export const resendVerificationEmailHandler = openApiHttp.post('/email/verification-notification', async ({response}) => {
    return response(202).json({});
});

export const verifyEmailHandler = openApiHttp.get('/email/verify/{id}/{hash}', async ({response}) => {
    return response(204).json({});
});