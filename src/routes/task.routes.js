const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/task.controller')
const auth  = require('../middleware/auth.middleware')



// ==> Rota responsavel por criar uma nova 'Task': (POST) localhost:3000/api/v1/tasks
router.post('/tasks', auth, tasksController.createTask);

// ==> Rota responsavel por listar todas as 'Tasks': (GET) localhost:3000/api/v1/tasks
router.get('/tasks', auth, tasksController.returnAllTasks);

// ==> Rota responsavel por listar uma 'Task' pelo 'Id': (GET) localhost:3000/api/v1/tasks/:taskId
router.get('/tasks/:taskId', auth, tasksController.returnTaskById);

// ==> Rota responsavel por atualizar uma 'Task' pelo 'Id': (PUT) localhost:3000/api/v1/tasks/:taskId
router.put('/tasks/update', auth, tasksController.updateTask);

// ==> Rota responsavel por deletar uma 'Task' pelo 'Id': (DELETE) localhost:3000/api/v1/tasks/:taskId
router.delete('/tasks/:taskId', auth, tasksController.deleteTask);

module.exports = router;