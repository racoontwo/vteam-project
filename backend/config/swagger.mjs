import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentation of the REST API for the project'
        },
        servers: [
            {
                url: 'http://localhost:5001' // Ändra till din bas-URL
            }
        ]
    },
    apis: ['./src/routes/v1/*.mjs'] // Peka på filerna där du skriver Swagger-kommentarer
};

const swaggerSpec = swaggerJSDoc(options);

export default { swaggerSpec };
