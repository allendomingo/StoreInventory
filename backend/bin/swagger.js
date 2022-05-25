const swaggerAutogen = require('swagger-autogen')();
const { definitions } = require('../models');

const doc = {
  info: {
    title: 'Inventory API',
    description: 'API for inventory management',
    version: '1.0.0',
    contact: {
      name: 'Allen Domingo',
    },
  },
  host: `localhost:${process.env.PORT}`,
  schemes: ['http'],
  definitions,
};

const outputFile = './bin/swagger-output.json';
const endpointsFiles = [
  './app.js',
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  // eslint-disable-next-line import/extensions
  require('./www');
});
