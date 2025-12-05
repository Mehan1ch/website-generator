import {getDashboardHandler} from "@/testing/mocks/handlers/dashboard.ts";
import {
    createSiteHandler,
    deleteSiteDeploymentHandler,
    deleteSiteHandler,
    deploySiteHandler,
    getSiteDeploymentHandler,
    getSiteHandler,
    getSitesHandler,
    restartSiteDeploymentHandler,
    updateSiteDeploymentHandler,
    updateSiteHandler,
} from "@/testing/mocks/handlers/site.ts";
import {
    createSchemaHandler,
    deleteSchemaHandler,
    getSchemaHandler,
    getSchemasHandler,
    publishSchemaHandler,
    updateSchemaHandler,
} from "@/testing/mocks/handlers/schema.ts";
import {loginHandler, logoutHandler, registerHandler} from "@/testing/mocks/handlers/auth.ts";
import {deleteUserHandler, getUserHandler} from "@/testing/mocks/handlers/user.ts";
import {csrfHandler} from "@/testing/mocks/handlers/csrf.ts";
import {
    createPageHandler,
    deletePageHandler,
    getPageHandler,
    getPagesForSiteHandler,
    updatePageHandler,
} from "@/testing/mocks/handlers/page.ts";
import {deleteAvatarHandler, uploadAvatarHandler} from "@/testing/mocks/handlers/avatar.ts";
import {resendVerificationEmailHandler, verifyEmailHandler} from "@/testing/mocks/handlers/email.ts";
import {
    confirmPasswordHandler,
    forgotPasswordHandler,
    getPasswordConfirmationStatusHandler,
    resetPasswordHandler,
    updatePasswordHandler,
    updateProfileHandler,
} from "@/testing/mocks/handlers/account.ts";

export const handlers = [
    // CSRF
    csrfHandler,

    // Auth
    loginHandler,
    logoutHandler,
    registerHandler,

    // User
    getUserHandler,
    deleteUserHandler,

    // Avatar
    uploadAvatarHandler,
    deleteAvatarHandler,

    // Email
    resendVerificationEmailHandler,
    verifyEmailHandler,

    // Account
    confirmPasswordHandler,
    getPasswordConfirmationStatusHandler,
    forgotPasswordHandler,
    resetPasswordHandler,
    updateProfileHandler,
    updatePasswordHandler,

    // Dashboard
    getDashboardHandler,

    // Sites
    getSitesHandler,
    createSiteHandler,
    getSiteHandler,
    updateSiteHandler,
    deleteSiteHandler,

    // Site Deployment
    getSiteDeploymentHandler,
    deploySiteHandler,
    updateSiteDeploymentHandler,
    deleteSiteDeploymentHandler,
    restartSiteDeploymentHandler,

    // Schemas
    getSchemasHandler,
    createSchemaHandler,
    getSchemaHandler,
    updateSchemaHandler,
    deleteSchemaHandler,
    publishSchemaHandler,

    // Pages
    getPagesForSiteHandler,
    createPageHandler,
    getPageHandler,
    updatePageHandler,
    deletePageHandler,
];