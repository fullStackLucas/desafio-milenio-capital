require('dotenv').config();
require('./models');
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(routes);


app.listen(PORT, () => console.log(`Escutando a porta ${PORT}`))