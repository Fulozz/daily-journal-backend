const express = require('express');
const router = express.Router();
const entryController = require('../controllers/entry.controller');
const auth = require('../middleware/auth.middleware');

/**
 * @route POST /api/v1/entries
 * @desc Cria uma nova entrada de diário
 * @access Privado
 */
router.post('/entries', auth, entryController.createEntry);

/**
 * @route GET /api/v1/entries
 * @desc Retorna todas as entradas do usuário
 * @access Privado
 */
router.get('/entries', auth, entryController.returnAllEntries);

/**
 * @route GET /api/v1/entries/:entryId
 * @desc Retorna uma entrada específica pelo ID
 * @access Privado
 */
router.get('/entries/:entryId', auth, entryController.returnEntryById);

/**
 * @route PUT /api/v1/entries/:entryId
 * @desc Atualiza uma entrada pelo ID
 * @access Privado
 */
router.put('/entries/:entryId', auth, entryController.updateEntry);

/**
 * @route DELETE /api/v1/entries/:entryId
 * @desc Exclui uma entrada pelo ID
 * @access Privado
 */
router.delete('/entries/:entryId', auth, entryController.deleteEntry);

module.exports = router;
