const swaggerAutogen = require('swagger-autogen')();
const definitions = require('../models').definitions;

const doc = {
  info: {
    title: "Inventory API",
		description: "API for inventory management",
		version: "1.0.0",
		contact: {
			name: "Allen Domingo"
		}
  },
  host: 'localhost:3000',
  schemes: ['http'],
	definitions,
};

const outputFile = './bin/swagger-output.json';
const endpointsFiles = [
	'./app.js',
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
	require('./www');
});