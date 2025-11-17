export const CreateSiteDeploymentRequest = {
    type: 'object',
    required: ['name', 'subDomain', 'domain', 'pages'],
    properties: {
        name: {type: 'string'},
        subDomain: {type: 'string'},
        domain: {type: 'string'},
        namespace: {type: 'string'},
        pages: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    path: {type: 'string'},
                    htmlUrl: {type: 'string'},
                }
            }
        }
    }
} as const;

const DefaultSiteDeploymentRequest = {
    type: 'object',
    required: ['name'],
    properties: {
        name: {type: 'string'},
        namespace: {type: 'string'},
    }
} as const;

export const ReadSiteDeploymentRequest = DefaultSiteDeploymentRequest;
export const UpdateSiteDeploymentRequest = CreateSiteDeploymentRequest;
export const DeleteSiteDeploymentRequest = DefaultSiteDeploymentRequest;
export const RestartSiteDeploymentRequest = DefaultSiteDeploymentRequest;