require('dotenv').config();
module.exports = {
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: 'milenio_capital',
  host: process.env.MYSQL_HOSTNAME || 'localhost',
  port: Number(process.env.MYSQL_PORT) || 3308,
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false
}