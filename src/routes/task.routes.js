const express = require('express');
const router = express.Router();

const auth  = require('../middleware/auth.middleware')

const tasksController = require('../controllers/tasks.controller')

// ==> Rota responsavel por criar uma nova 'Task': (POST) localhost:3000/api/v1/tasks
router.post('/tasks', auth, tasksController.createTask);

// ==> Rota responsavel por listar todas as 'Tasks': (GET) localhost:3000/api/v1/tasks
router.get('/tasks', auth, tasksController.returnAllTasks);

// ==> Rota responsavel por listar uma 'Task' pelo 'Id': (GET) localhost:3000/api/v1/tasks/:taskId
router.get('/tasks/:taskId', auth, tasksController.returnTaskById);

// ==> Rota responsavel por atualizar uma 'Task' pelo 'Id': (PUT) localhost:3000/api/v1/tasks/:taskId
router.put('/tasks/:taskId', auth, tasksController.updateTask);
