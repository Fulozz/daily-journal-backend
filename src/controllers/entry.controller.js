const Entry = require('../models/entry.model');

/**
 * Cria uma nova entrada de diário
 * @route POST /api/v1/entries
 * @access Privado
 */
exports.createEntry = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.userData.userId;

    // Validação básica
    if (!title || !content) {
      return res.status(400).json({ message: 'Título e conteúdo são obrigatórios' });
    }

    // Cria a nova entrada
    const newEntry = new Entry({
      title,
      content,
      userId
    });

    // Salva a entrada no banco de dados
    const savedEntry = await newEntry.save();

    res.status(201).json(savedEntry);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar entrada', error: error.message });
  }
};

/**
 * Retorna todas as entradas do usuário
 * @route GET /api/v1/entries
 * @access Privado
 */
exports.returnAllEntries = async (req, res) => {
  try {
    const userId = req.userData.userId;
    
    // Busca as entradas ordenadas por data de criação (mais recentes primeiro)
    const entries = await Entry.find({ userId }).sort({ createdAt: -1 });
    
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar entradas', error: error.message });
  }
};

/**
 * Retorna uma entrada específica pelo ID
 * @route GET /api/v1/entries/:entryId
 * @access Privado
 */
exports.returnEntryById = async (req, res) => {
  try {
    const { entryId } = req.params;
    const userId = req.userData.userId;

    const entry = await Entry.findOne({ _id: entryId, userId });

    if (!entry) {
      return res.status(404).json({ message: 'Entrada não encontrada' });
    }

    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar entrada', error: error.message });
  }
};

/**
 * Atualiza uma entrada pelo ID
 * @route PUT /api/v1/entries/:entryId
 * @access Privado
 */
exports.updateEntry = async (req, res) => {
  try {
    const { entryId } = req.params;
    const userId = req.userData.userId;
    const { title, content } = req.body;

    // Validação básica
    if (!title || !content) {
      return res.status(400).json({ message: 'Título e conteúdo são obrigatórios' });
    }

    // Busca e atualiza a entrada
    const updatedEntry = await Entry.findOneAndUpdate(
      { _id: entryId, userId },
      { title, content },
      { new: true }
    );

    if (!updatedEntry) {
      return res.status(404).json({ message: 'Entrada não encontrada' });
    }

    res.status(200).json(updatedEntry);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar entrada', error: error.message });
  }
};

/**
 * Exclui uma entrada pelo ID
 * @route DELETE /api/v1/entries/:entryId
 * @access Privado
 */
exports.deleteEntry = async (req, res) => {
  try {
    const { entryId } = req.params;
    const userId = req.userData.userId;

    const deletedEntry = await Entry.findOneAndDelete({ _id: entryId, userId });

    if (!deletedEntry) {
      return res.status(404).json({ message: 'Entrada não encontrada' });
    }

    res.status(200).json({ message: 'Entrada excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir entrada', error: error.message });
  }
};
