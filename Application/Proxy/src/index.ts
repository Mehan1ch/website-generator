import {siteDeploymentRoutes} from "./routes/siteDeployment.js";
import Fastify from "fastify";
import dotenv from 'dotenv';

dotenv.config({path: ".env"});

export const server = Fastify({
    logger: true
});

await server.register(import('@fastify/swagger'));

await server.register(import('@fastify/swagger-ui'), {
    routePrefix: '/documentation',
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false
    },
    uiHooks: {},
    staticCSP: true,
    transformSpecificationClone: true
});

server.register(siteDeploymentRoutes);

await server.ready();
server.swagger();

try {
    await server.listen({
        host: "0.0.0.0",
        port: 3000
    });
} catch (err) {
    server.log.error(err);
    process.exit(1);
}
