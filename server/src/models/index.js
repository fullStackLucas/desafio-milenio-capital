'use strict';
const { Sequelize } = require('sequelize');
const config = require('../config/config.js');

const db = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    dialect: config.development.dialect,
    host: config.development.host,
    port: config.development.port
  }
);

module.exports = db;
