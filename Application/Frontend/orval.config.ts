import 'dotenv/config';

const openApiSpecPath = process.env.OPENAPI_SPEC_PATH;

module.exports = {
    backend: {
        input: {
            target: openApiSpecPath
        },
        output: {
            mode: 'tags-split',
            target: 'src/api/endpoints',
            schemas: 'src/api/models',
            client: 'react-query',
            fileExtension: '.gen.ts',
            mock: true,
            prettier: true,
            override: {
                mutator: {
                    path: './src/api/mutator/custom-client.ts',
                    name: 'customClient',
                },
            },
        },
        hooks: {
            afterAllFilesWrite: 'prettier --write',
        },
    },
    backendZod: {
        input: {
            target:
                '../Backend/storage/app/private/scribe/openapi.yaml'
        },
        output: {
            mode: 'tags-split',
            client:
                'zod',
            target:
                'src/api/endpoints',
            fileExtension:
                '.zod.ts',
        },
    },
};