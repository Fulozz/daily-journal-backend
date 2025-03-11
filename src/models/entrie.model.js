const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrySchema = new Schema({
  title: {
    type: String,
    required: [true, 'O título da entrada é obrigatório'],
    trim: true,
    maxlength: [100, 'O título não pode ter mais de 100 caracteres']
  },
  content: {
    type: String,
    required: [true, 'O conteúdo da entrada é obrigatório'],
    trim: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'O ID do usuário é obrigatório']
  }
}, {
  timestamps: true,
  versionKey: false
});

// Índices para melhorar a performance das consultas
entrySchema.index({ userId: 1 });
entrySchema.index({ createdAt: -1 });

module.exports = mongoose.model('Entry', entrySchema);
