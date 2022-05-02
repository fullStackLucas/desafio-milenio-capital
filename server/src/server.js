const express = require('express');
const { json } = require('express');
const cors = require('cors');
const routes = require('./routes');

const server = express();
const errorMiddleware = require('./middlewares/errorMiddleware');

server.use(json());
server.use(routes);
server.use(cors());
server.use(errorMiddleware);

module.exports = server;


