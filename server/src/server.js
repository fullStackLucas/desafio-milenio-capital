require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const server = express();
const PORT = process.env.PORT || 8080;

server.use(express.json());
server.use(cors());
server.use(routes);


server.listen(PORT, () => console.log(`Escutando a porta ${PORT}`))