// src/app
const express = require('express');
const morgan = require('morgan')
const cors = require('cors')

// => Inicialização do servidor express
const app = express()

// => Conexão com o banco de dados
const mongooseConnection = require('./configuration/mongooseConnection.config');


// => importe de rotas API
const index = require('./routes/index')
const userRoutes = require('./routes/user.routes')
const taskRoutes = require('./routes/task.routes')
// => configuração do servidor

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json'}));
app.use(cors());
app.use(morgan('dev'));

app.set("mongoose connection", mongooseConnection);

// => Definicição de rotas
app.use(index)
app.use('/api/v1', userRoutes)
app.use('/api/v1', taskRoutes)



module.exports = app