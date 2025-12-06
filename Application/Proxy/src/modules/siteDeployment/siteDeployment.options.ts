import type {RouteShorthandOptions} from "fastify";
import {
    CreateSiteDeploymentRequest,
    DeleteSiteDeploymentRequest,
    ReadSiteDeploymentRequest,
    RestartSiteDeploymentRequest,
    UpdateSiteDeploymentRequest
} from "./siteDeployment.request.js";
import {SiteDeploymentResponseError, SiteDeploymentResponseSuccess} from "./siteDeployment.response.js";

export const ReadSiteDeploymentOptions: RouteShorthandOptions = {
    schema: {
        params: ReadSiteDeploymentRequest,
        response: {
            200: SiteDeploymentResponseSuccess,
            400: SiteDeploymentResponseError
        }
    }
} as const;

export const CreateSiteDeploymentOptions: RouteShorthandOptions = {
    schema: {
        body: CreateSiteDeploymentRequest,
        response: {
            201: SiteDeploymentResponseSuccess,
            400: SiteDeploymentResponseError
        }
    }
} as const;

export const UpdateSiteDeploymentOptions: RouteShorthandOptions = {
    schema: {
        body: UpdateSiteDeploymentRequest,
        response: {
            200: SiteDeploymentResponseSuccess,
            400: SiteDeploymentResponseError
        }
    }
} as const;

export const DeleteSiteDeploymentOptions: RouteShorthandOptions = {
    schema: {
        params: DeleteSiteDeploymentRequest,
        response: {
            200: SiteDeploymentResponseSuccess,
            400: SiteDeploymentResponseError
        }
    }
} as const;

export const RestartSiteDeploymentOptions: RouteShorthandOptions = {
    schema: {
        params: RestartSiteDeploymentRequest,
        response: {
            200: SiteDeploymentResponseSuccess,
            400: SiteDeploymentResponseError
        }
    }
} as const;