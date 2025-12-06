import {
    CreateSiteDeploymentOptions,
    DeleteSiteDeploymentOptions,
    ReadSiteDeploymentOptions,
    RestartSiteDeploymentOptions,
    UpdateSiteDeploymentOptions
} from "../modules/siteDeployment/siteDeployment.options.js";
import {siteDeploymentController} from "../modules/siteDeployment/siteDeployment.controller.js";
import type {FastifyInstance, RouteShorthandOptions} from "fastify";

export const siteDeploymentRoutes = (server: FastifyInstance, _: RouteShorthandOptions, done: (err?: Error | undefined) => void) => {
    server.get('/deployment/:namespace/:name', ReadSiteDeploymentOptions, siteDeploymentController.readSiteDeployment);
    server.post('/deployment', CreateSiteDeploymentOptions, siteDeploymentController.createSiteDeployment);
    server.put('/deployment', UpdateSiteDeploymentOptions, siteDeploymentController.updateSiteDeployment);
    server.delete('/deployment/:namespace/:name', DeleteSiteDeploymentOptions, siteDeploymentController.deleteSiteDeployment);
    server.post('/deployment/:namespace/:name/restart', RestartSiteDeploymentOptions, siteDeploymentController.restartSiteDeployment);
    done();
};
