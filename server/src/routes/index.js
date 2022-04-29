const express = require('express');
const helloWorld = require('./helloWorld');
const GraphController = require('../controllers/GraphController')

const routes = express.Router();
routes.get('/', helloWorld);
routes.get('/graph', GraphController.create)

module.exports = routes;