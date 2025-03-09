const Task = require('../models/task.model')
const jwt = require('jsonwebtoken')


exports.createTast = async (req, res) => {
    try {
        const { title, description, status, data, userId } = req.body;
        const task = new Task({
            title,
            description,
            status,
            data,
            user: req.userData._id
        });
        await task.save();
        res.status(201).json({ message: 'Task created successfully!', task });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.returnAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.userData._id });
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
        const { title, description, status, data } = req.body;
        const task = await Task.findOne({ _id: taskId, user: req.userData._id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found!' });
        }
        task.title = title;
        task.description = description;
        task.status = status;
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