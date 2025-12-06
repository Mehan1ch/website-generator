import {openApiHttp} from "@/testing/utils/openApiHttp.ts";

export const confirmPasswordHandler = openApiHttp.post('/user/confirm-password', async ({response}) => {
    return response(201).json({});
});

export const getPasswordConfirmationStatusHandler = openApiHttp.get('/user/confirmed-password-status', async ({response}) => {
    return response(200).json({confirmed: true});
});

export const forgotPasswordHandler = openApiHttp.post('/forgot-password', async ({response}) => {
    return response(200).json({});
});

export const resetPasswordHandler = openApiHttp.post('/reset-password', async ({response}) => {
    return response(200).json({});
});

// Profile management handlers
export const updateProfileHandler = openApiHttp.put('/user/profile-information', async ({response}) => {
    return response(200).json({});
});

export const updatePasswordHandler = openApiHttp.put('/user/password', async ({response}) => {
    return response(200).json({});
});

