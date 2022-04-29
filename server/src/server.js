require('dotenv').config();
const express = require('express');
const { json } = require('express');
const cors = require('cors');
const routes = require('./routes');

const server = express();
const PORT = process.env.PORT || 8080;

server.use(json());
server.use(routes);
server.use(cors());


server.listen(PORT, () => console.log(`Escutando a porta ${PORT}`))