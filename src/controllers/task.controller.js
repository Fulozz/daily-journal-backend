const Task = require('../models/task.model')


exports.createTask = async (req, res) => {
    const userId = req.userData._id;
    if(!userId) {
        return res.status(400).json({ message: 'User id is required!' });
    }
    try {
        const { title, description, completed, dueDate } = req.body;
        const missingFields = [];
        if (!title) missingFields.push('Title');
        if (!description) missingFields.push('Description');
        if (!dueDate) missingFields.push('Due date');
        if (!userId) missingFields.push('User id');

        if (missingFields.length > 0) {
            return res.status(400).json({ message: `Missing fields: ${missingFields.join(', ')}` });
        }
        const task = new Task({
            title,
            description,
            completed,
            dueDate,
            userId: userId
        });
        await task.save();
        res.status(201).json({ message: 'Task created successfully!', task });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.returnAllTasks = async (req, res) => {
    const userId = req.userData._id;
    if(!userId) {
        return res.status(400).json({ message: 'User id is required!' });
    }
    try {
        const tasks = await Task.find({ userId: userId});
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}   
exports.returnTaskById = async (req, res) => {
    try {
        const userId = req.userData._id;
        const { taskId } = req.params;
        const task = await Task.findOne({ _id: taskId, user: userId });
        if (!task) {
            return res.status(404).json({ message: 'Task not found!' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.updateTask = async (req, res) => {
    const userId = req.userData._id;
    if(!userId) {
        return res.status(400).json({ message: 'User id is required' });
    }
    try {
        const { title, description, completed, data, taskId} = req.body;
        const task = await Task.findOne({ _id: taskId, userId: userId });
        if (!task) {
            return res.status(404).json({ message: 'Task not found!' });
        }
        task.title = title;
        task.description = description;
        task.completed = completed;
        task.data = data;
        await task.save();
        res.status(200).json({ message: 'Task updated successfully!', task });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.deleteTask = async (req, res) => {
    const userId = req.userData._id;
    if(!userId) {
        return res.status(400).json({ message: 'User id is required!' });
    }
    try {
        const taskId = req.params.taskId;

        const missingFields = [];
        if (!taskId) missingFields.push('TaskId');

        if (missingFields.length > 0) {
            return res.status(400).json({ message: `Missing fields: ${missingFields.join(', ')} ${taskId}` });
        }
        const task = await Task.findOne({ _id: taskId, userId: userId });
        if (!task) {
                    return res.status(404).json({ message: 'Task not found!' });
                }
        const taskDelete = await Task.findOneAndDelete({ _id: taskId, userId: userId});
        
        if(taskDelete){
            return res.status(200).json({ message: 'Task deleted successfully!', task });
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.toggleTaskStatus = async (req, res) => {
    const userId = req.userData._id;
    if(!userId) {
        return res.status(400).json({ message: 'User id is required!' });
    }
    try {
        const taskId = req.params.taskId;

        const missingFields = [];
        if (!taskId) missingFields.push('TaskId');

        if (missingFields.length > 0) {
            return res.status(400).json({ message: `Missing fields: ${missingFields.join(', ')} ${taskId}` });
        }
        // Encontrar a tarefa
        const task = await Task.findOne({ _id: taskId, userId: userId });
        
        if (!task) {
            return res.status(404).json({ message: 'Task not found!' });
        }
        
        // Inverter o status de conclusão
        const newCompletedStatus = !task.completed;
        
        // Atualizar a data de conclusão
        const completionDate = newCompletedStatus ? new Date() : null;
        
        // Atualizar a tarefa
        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId, userId: userId },
            { 
                completed: newCompletedStatus,
                completionDate: completionDate
            },
            { new: true } // Retorna o documento atualizado
        );
        
        return res.status(200).json({ 
            message: 'Task status updated successfully!', 
            task: updatedTask 
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};