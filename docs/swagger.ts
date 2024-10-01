import swaggerAutogen from 'swagger-autogen';
import 'dotenv/config'

const options = {
    openapi: '3.0.0',
    language: 'pt-BR',
    autoHeaders: true,
    autoQuery: true,
    autoBody: true
}

const host = `${process.env.DOMAIN || 'localhost'}:${process.env.API_EXTERNAL_PORT || 3000}`;

const doc = {
    info: {
        version: '1.0.0',
        title: 'Gerador de Tokens API',
        description: 'Serviço de geração de tokens assincrono, nesta documentação podem ser encontrados todos os endpoints disponíveis para criação, verificação e edição de tokens, além de endpoints para controle das aplicações que o consomem.',
    },
    host,
    basePath: "/",
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Token",
            "description": "Token endpoints, use your application token to access these endpoints"
        },
        {
            "name": "Application",
            "description": "Application endpoints, use your admin token to access these endpoints"
        }
    ],
    securityDefinitions: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'Enter your bearer token in the format **Bearer &lt;token>**'
        }
    },
    definitions: {
        Token: {
            id: 1,
            type: 'SMS',
            token: '123456',
            destination: '5511911223344',
            status: false,
            user: 'John Doe',
        },
        GetAllApplicationsResponse: [
            {
                id: 1,
                name: 'Application 01',
                enabled: true
            },
            {
                id: 2,
                name: 'Application 02',
                enabled: false
            }
        ],
        CreateApplicationInput: {
            enable: true,
            token: 'token_here',
            name: 'Application 01'
        },
        ChangeApplicationNameInput: {
            application_id: 12,
            name: 'Application 02'
        },
        ChangeApplicationTokenInput: {
            application_id: 12,
            token: 'token_here'
        },
        EnableApplicationInput: {
            application_id: 12,
            enable: true
        },
        CreateTokenInput: {
            destination: '5511911223344',
            token_type: 'SMS',
            user: 'John Doe'
        },
        ResendTokenInput: {
            destination: '5511911223344',
            token_type: 'SMS',
            user: 'John Doe'
        },
        VerifyTokenInput: {
            token: '123456',
            user: 'John Doe'
        },
    }
};

const outputFile = './swagger-output.json';
const routes = ['./src/shared/routes.ts'];

swaggerAutogen(options)(outputFile, routes, doc);