import Fastify from 'fastify';


export const app = Fastify({
    logger: true
});

await app.register(import('@fastify/swagger'));

await app.register(import('@fastify/swagger-ui'), {
    routePrefix: '/documentation',
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false
    },
    uiHooks: {
        onRequest: function (request, reply, next) {
            next();
        },
        preHandler: function (request, reply, next) {
            next();
        }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
        return swaggerObject;
    },
    transformSpecificationClone: true
});


try {
    await app.listen({
        host: "0.0.0.0",
        port: 3000
    });
} catch (err) {
    app.log.error(err);
    process.exit(1);
}
