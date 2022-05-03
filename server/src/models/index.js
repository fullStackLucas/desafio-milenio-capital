'use strict';
const { Sequelize } = require('sequelize');
require('dotenv').config();
const config = require('../config/config.js');

// const db = new Sequelize(
//   config.database,
//   config.username,
//   config.password,
//   {
//     dialect: config.dialect,
//     host: config.host,
//     port: process.env.MYSQL_PORT
//   }
// );
const db = new Sequelize(config);

module.exports = db;
