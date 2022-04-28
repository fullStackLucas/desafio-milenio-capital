const express = require('express');
const helloWorld = require('./helloWorld');

const routes = express.Router();
routes.get('/', helloWorld);

module.exports = routes;