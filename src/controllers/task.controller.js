const Task = require('../models/task.model')


exports.createTask = async (req, res) => {
    try {
        const { title, description, completed, dueDate } = req.body;
        const task = new Task({
            title,
            description,
            completed,
            dueDate,
            user: req.userId
        });
        await task.save();
        res.status(201).json({ message: 'Task created successfully!', task });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.returnAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.userId });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}   
exports.returnTaskById = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findOne({ _id: taskId, user: req.userData._id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found!' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { title, description, completed, data } = req.body;
        const task = await Task.findOne({ _id: taskId, user: req.userData._id });
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
    try {
        const { taskId } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskId, user: req.userData._id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found!' });
        }
        res.status(200).json({ message: 'Task deleted successfully!', task });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}