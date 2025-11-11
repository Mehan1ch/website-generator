import type {FastifyReply, FastifyRequest} from "fastify";
import type {DefaultResource} from "../../types/types.js";
import {deploymentService} from "../deployment/deployment.service.js";
import {ingressService} from "../ingress/ingress.service.js";
import {serviceService} from "../service/service.service.js";
import type {IngressResource} from "../ingress/ingress.type.js";
import type {SiteDeploymentBody} from "./siteDeployment.type.js";

class SiteDeploymentController {

    readSiteDeployment = async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.params as DefaultResource;
        try {
            const deployment = await deploymentService.readDeployment(body);
            reply.status(200).send(deployment);
        } catch (err: unknown) {
            console.error('Error during site deployment read:', err);
            reply.status(400).send({
                message: 'Failed to read site deployment',
                error: err instanceof Error ? err.message : String(err)
            });
            return;
        }
    };

    createSiteDeployment = async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as SiteDeploymentBody;
        try {
            await deploymentService.createDeployment(body);
            await serviceService.createService(body);
            await ingressService.createIngress(body);
            reply.status(201).send({message: 'Site deployment created successfully'});
        } catch (err: unknown) {
            console.error('Error during site deployment creation:', err);
            reply.status(400).send({
                message: 'Failed to create site deployment',
                error: err instanceof Error ? err.message : String(err)
            });
            return;
        }
    };

    updateSiteDeployment = async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as SiteDeploymentBody;
        try {
            await deploymentService.updateDeployment(body);
        } catch (err: unknown) {
            console.error('Error during site deployment update:', err);
            reply.status(400).send({
                message: 'Failed to update site deployment',
                error: err instanceof Error ? err.message : String(err)
            });
            return;
        }
    };

    deleteSiteDeployment = async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.params as IngressResource;
        try {
            await ingressService.deleteIngress(body);
            await serviceService.deleteService(body);
            await deploymentService.deleteDeployment(body);
            reply.status(200).send({message: 'Site deployment deleted successfully'});
        } catch (err: unknown) {
            console.error('Error during site deployment deletion:', err);
            reply.status(400).send({
                message: 'Failed to delete site deployment',
                error: err instanceof Error ? err.message : String(err)
            });
            return;
        }
    };

    restartSiteDeployment = async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.params as DefaultResource;
        try {
            await deploymentService.restartDeployment(body);
            reply.status(200).send({message: 'Site deployment restarted successfully'});
        } catch (err: unknown) {
            console.error('Error during site deployment restart:', err);
            reply.status(400).send({
                message: 'Failed to restart site deployment',
                error: err instanceof Error ? err.message : String(err)
            });
            return;
        }
    };
}

export const siteDeploymentController = new SiteDeploymentController();