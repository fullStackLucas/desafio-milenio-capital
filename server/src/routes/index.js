const express = require('express');
const RouteController = require('../controllers/RouteController');
const GraphController = require('../controllers/GraphController');
const validationMiddleware = require('../middlewares/validations');

const routes = express.Router();
routes.get('/graph/:graphId', RouteController.getAllById);
routes.post('/graph', validationMiddleware, GraphController.create);
routes.post('/distance/:graphId/from/:town1/to/:town2', RouteController.getShortestPath);

module.exports = routes;