const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
import Config from '../config';
import { version } from '../package.json';
const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'X-Financial',
      description: 'Loan Provider Api',
      summary: '',
      version,
      contact: {
        name: 'API Support',
        url: 'namitchp@gmail.com',
        email: 'namitchp@gmail.com',
      },
    },
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          name: 'token',
          in: 'header',
          description: 'JWT token to access API endpoints',
        },
      },
    },
    servers: [
      {
        url: `http://localhost:${Config.PORT}`,
        description: 'Development Url',
      },
      {
        url: `http://13.60.4.16:6060`,
        description: 'production Url',
      },
    ],
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js', './app/modules/**/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(swaggerSpec),
  doc: swaggerSpec,
};
