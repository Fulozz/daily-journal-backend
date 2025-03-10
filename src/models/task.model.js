const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config();

const Schema = mongoose.Schema;


const taskSchema = new Schema({
    title: { type: String, maxLenght: 50, required: true},
    description: { type: String, required: true},
    completed: { type: Boolean, required: true},
    userId: { type: String, required: true},
    dueDate: { type: Date, required: true}
},{
    timestamps: true,
    collection: 'tasks'
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;