const express = require('express');
const helloWorld = require('./helloWorld');
const RouteController = require('../controllers/RouteController');
const GraphController = require('../controllers/GraphController');

const routes = express.Router();
routes.get('/', helloWorld);
routes.get('/graph/:graphId', RouteController.getAllById);
routes.post('/graph', GraphController.create);
routes.post('/graph/:graphId/from/:town1/to/:town2', RouteController.getShortestPath)

module.exports = routes;