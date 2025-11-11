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
    server.get('/deploy/:namespace/:name', ReadSiteDeploymentOptions, siteDeploymentController.readSiteDeployment);
    server.post('/deploy', CreateSiteDeploymentOptions, siteDeploymentController.createSiteDeployment);
    server.put('/deploy/:namespace/:name', UpdateSiteDeploymentOptions, siteDeploymentController.updateSiteDeployment);
    server.delete('/deploy/:namespace/:name', DeleteSiteDeploymentOptions, siteDeploymentController.deleteSiteDeployment);
    server.post('/deploy/:namespace/:name/restart', RestartSiteDeploymentOptions, siteDeploymentController.restartSiteDeployment);
    done();
};
