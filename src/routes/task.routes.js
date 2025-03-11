const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/task.controller');
const auth = require('../middleware/auth.middleware');

/**
 * @route POST /api/v1/tasks
 * @desc Cria uma nova tarefa
 * @access Privado
 */
router.post('/tasks', auth, tasksController.createTask);

/**
 * @route GET /api/v1/tasks
 * @desc Retorna todas as tarefas do usuário
 * @access Privado
 */
router.get('/tasks', auth, tasksController.returnAllTasks);

/**
 * @route GET /api/v1/tasks/:taskId
 * @desc Retorna uma tarefa específica pelo ID
 * @access Privado
 */
router.get('/tasks/:taskId', auth, tasksController.returnTaskById);

/**
 * @route PUT /api/v1/tasks/:taskId
 * @desc Atualiza uma tarefa pelo ID
 * @access Privado
 */
router.put('/tasks/:taskId', auth, tasksController.updateTask);

/**
 * @route PATCH /api/v1/tasks/:taskId/toggle
 * @desc Alterna o status de conclusão de uma tarefa
 * @access Privado
 */
router.patch('/tasks/:taskId/toggle', auth, tasksController.toggleTaskCompletion);

/**
 * @route DELETE /api/v1/tasks/:taskId
 * @desc Exclui uma tarefa pelo ID
 * @access Privado
 */
router.delete('/tasks/:taskId', auth, tasksController.deleteTask);

module.exports = router;