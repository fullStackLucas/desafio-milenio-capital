const express = require('express');
const bodyParser = require('body-parser');
const { json } = require('express');
const cors = require('cors');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


const server = express();
const errorMiddleware = require('./middlewares/errorMiddleware');

server.use(bodyParser.urlencoded({ extended: false }));
server.use(json());
routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use(routes);
server.use(cors());
server.use(errorMiddleware);

module.exports = server;
