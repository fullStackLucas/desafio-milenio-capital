const express = require('express');
const helloWorld = require('./helloWorld');
const RouteController = require('../controllers/RouteController');
const GraphController = require('../controllers/GraphController');

const routes = express.Router();
routes.get('/', helloWorld);
routes.post('/graph', GraphController.create);
routes.get('/graph/:graphId', RouteController.getAllById);

module.exports = routes;