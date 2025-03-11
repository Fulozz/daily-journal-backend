const Task = require('../models/task.model');

/**
 * Cria uma nova tarefa
 * @route POST /api/v1/tasks
 * @access Privado
 */
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const userId = req.userData.userId;

    // Validação básica
    if (!title) {
      return res.status(400).json({ message: 'O título da tarefa é obrigatório' });
    }

    // Cria a nova tarefa
    const newTask = new Task({
      title,
      description,
      dueDate: dueDate || null,
      userId
    });

    // Salva a tarefa no banco de dados
    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar tarefa', error: error.message });
  }
};

/**
 * Retorna todas as tarefas do usuário
 * @route GET /api/v1/tasks
 * @access Privado
 */
exports.returnAllTasks = async (req, res) => {
  try {
    const userId = req.userData.userId;
    
    // Opções de filtro
    const filter = { userId };
    
    // Verifica se há filtros na query string
    if (req.query.completed === 'true') {
      filter.completed = true;
    } else if (req.query.completed === 'false') {
      filter.completed = false;
    }

    // Busca as tarefas com os filtros aplicados
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tarefas', error: error.message });
  }
};

/**
 * Retorna uma tarefa específica pelo ID
 * @route GET /api/v1/tasks/:taskId
 * @access Privado
 */
exports.returnTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.userData.userId;

    const task = await Task.findOne({ _id: taskId, userId });

    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tarefa', error: error.message });
  }
};

/**
 * Atualiza uma tarefa pelo ID
 * @route PUT /api/v1/tasks/:taskId
 * @access Privado
 */
exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.userData.userId;
    const { title, description, dueDate } = req.body;

    // Validação básica
    if (!title) {
      return res.status(400).json({ message: 'O título da tarefa é obrigatório' });
    }

    // Busca e atualiza a tarefa
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, userId },
      { 
        title, 
        description, 
        dueDate: dueDate || null 
      },
      { new: true } // Retorna o documento atualizado
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar tarefa', error: error.message });
  }
};

/**
 * Alterna o status de conclusão de uma tarefa
 * @route PATCH /api/v1/tasks/:taskId/toggle
 * @access Privado
 */
exports.toggleTaskCompletion = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.userData.userId;
    
    // Busca a tarefa
    const task = await Task.findOne({ _id: taskId, userId });
    
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    
    // Inverte o status de conclusão
    const newCompletedStatus = !task.completed;
    
    // Define ou limpa a data de conclusão
    const completionDate = newCompletedStatus ? new Date() : null;
    
    // Atualiza a tarefa
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, userId },
      { 
        completed: newCompletedStatus,
        completionDate
      },
      { new: true }
    );
    
    res.status(200).json({ 
      message: 'Status da tarefa atualizado com sucesso', 
      task: updatedTask 
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao alternar status da tarefa', error: error.message });
  }
};

/**
 * Exclui uma tarefa pelo ID
 * @route DELETE /api/v1/tasks/:taskId
 * @access Privado
 */
exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.userData.userId;

    const deletedTask = await Task.findOneAndDelete({ _id: taskId, userId });

    if (!deletedTask) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    res.status(200).json({ message: 'Tarefa excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir tarefa', error: error.message });
  }
};
