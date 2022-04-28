require('dotenv').config();

module.exports = {
  development: {
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'password',
    database: 'milenio_capital',
    host: process.env.HOSTNAME || 'localhost',
    dialect: 'mysql',
    port: 3308
  },
  test: {
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'password',
    database: 'milenio_capital',
    host: process.env.HOSTNAME || 'db',
    dialect: 'mysql',
  },
  production: {
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'password',
    database: 'milenio_capital',
    host: process.env.HOSTNAME || 'db',
    dialect: 'mysql',
  },
};