// src/app
const express = require('express');
const morgan = require('morgan')
const cors = require('cors')

// => Inicialização do servidor express
const app = express()

// => Conexão com o banco de dados
const mongooseConnection = require('./configuration/mongooseConnection.config');


// => importe de rotas API
const index = require('./routes/a.routes')
const userRoutes = require('./routes/user.routes')
const taskRoutes = require('./routes/task.routes')
const entrieRoutes = require('./routes/entrie.routes')


// => configuração do servidor
const allowedOrigins = [
  'http://localhost:3000',
  'https://personal-daily-journal.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json'}));
app.use(morgan('dev'));

app.set("mongoose connection", mongooseConnection);

// => Definicição de rotas
app.use(index)
app.use('/api/v1', userRoutes)
app.use('/api/v1', taskRoutes)
app.use('/api/v1', entrieRoutes)


module.exports = app