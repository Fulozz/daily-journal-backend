const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: [true, 'O título da tarefa é obrigatório'],
    trim: true,
    maxlength: [100, 'O título não pode ter mais de 100 caracteres']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'A descrição não pode ter mais de 500 caracteres']
  },
  completed: {
    type: Boolean,
    default: false
  },
  dueDate: {
    type: Date,
    default: null
  },
  completionDate: {
    type: Date,
    default: null
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'O ID do usuário é obrigatório']
  }
}, {
  timestamps: true, // Adiciona createdAt e updatedAt
  versionKey: false // Remove o campo __v
});

// Índices para melhorar a performance das consultas
taskSchema.index({ userId: 1 });
taskSchema.index({ completed: 1 });
taskSchema.index({ dueDate: 1 });

module.exports = mongoose.model('Task', taskSchema);
