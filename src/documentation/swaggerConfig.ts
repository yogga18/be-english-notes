import swaggerJsdoc from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express';

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'be-enlish-note API Documentation',
      version: '1.0.0',
      description: 'API Documentation for be-enlish-note',
    },
  },
  apis: ['src/routes/*.ts', 'src/routes/**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export { swaggerSpec, swaggerui };
