const express = require('express');

const routes = express.Router();
routes.get('/', (_req, res) => {
  return res.status(200).json({ message: 'Hello, Milenio!'});
});

module.exports = routes;