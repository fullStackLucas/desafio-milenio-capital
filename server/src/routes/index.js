const express = require('express');
const RouteController = require('../controllers/RouteController');
const GraphController = require('../controllers/GraphController');
const validationMiddleware = require('../middlewares/validations');

const routes = express.Router();
routes.get('/graph/:graphId', validationMiddleware, RouteController.getAllById);
routes.post('/graph', GraphController.create);
routes.post(
  '/distance/:graphId/from/:town1/to/:town2',
  validationMiddleware,
  RouteController.getShortestPath,
);

module.exports = routes;