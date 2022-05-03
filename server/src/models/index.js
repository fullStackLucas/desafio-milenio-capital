'use strict';
const { Sequelize } = require('sequelize');
require('dotenv').config();
const config = require('../config/config.js');

const db = new Sequelize(config);

module.exports = db;
