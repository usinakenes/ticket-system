const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require('swagger-jsdoc');

const router = express.Router();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'PVK biljettsystem',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:7050/',
                description: 'Development server'
            },{
		url: 'https://biljettsystem.salamon.xyz/',
		description: 'Testing server'
	    }
        ]
    },
    apis: ['./routes/*.js', './api-spec.yml'], // files containing annotations as above
};

const swaggerSpec = swaggerJSDoc(options);
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;
