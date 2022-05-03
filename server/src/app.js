require('dotenv').config();
const server = require('./server')

const PORT = 8080;

server.listen(PORT, () => console.log(`Escutando a porta ${PORT}`))