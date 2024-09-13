import swaggerAutogen from 'swagger-autogen';

const options = {
    openapi: '3.0.0',
    language: 'pt-BR',
    autoHeaders: true,
    autoQuery: true,
    autoBody: true
}

const doc = {
    info: {
        version: '1.0.0',
        title: 'GERADOR DE TOKENS',
        description: ''
    },
    servers: [
        {
            url: 'http://localhost:8080',
            description: ''
        },
    ],
    tags: [
        {
            name: '',
            description: ''
        },
    ],
    components: {}
};

const outputFile = './swagger-output.json';
const routes = ['./src/shared/routes.ts'];

swaggerAutogen(options)(outputFile, routes, doc);