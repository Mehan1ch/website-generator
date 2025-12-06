export const SiteDeploymentResponseSuccess = {
    type: 'object',
    properties: {
        message: {type: 'string'},
    }
} as const;

export const SiteDeploymentResponseError = {
    type: 'object',
    properties: {
        message: {type: 'string'},
        error: {type: 'string'}
    }
} as const;