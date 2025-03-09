const express = require('express');
const router = express.Router();
const entriesController = require('../controllers/entrie.controller')
const auth  = require('../middleware/auth.middleware')

// ==> Rota responsavel por criar uma nova 'Entrie': (POST) localhost:3000/api/v1/entries
router.post('/entries', auth, entriesController.createEntrie);

// ==> Rota responsavel por listar todas as 'Entries': (GET) localhost:3000/api/v1/entries
router.get('/entries', auth, entriesController.returnAllEntries);

// ==> Rota responsavel por listar uma 'Entrie' pelo 'Id': (GET) localhost:3000/api/v1/entries/:entrieId
router.get('/entries/:entrieId', auth, entriesController.returnEntrieById);

// ==> Rota responsavel por atualizar uma 'Entrie' pelo 'Id': (PUT) localhost:3000/api/v1/entries/:entrieId
router.put('/entries/:entrieId', auth, entriesController.updateEntrie);

// ==> Rota responsavel por deletar uma 'Entrie' pelo 'Id': (DELETE) localhost:3000/api/v1/entries/:entrieId
router.delete('/entries/:entrieId', auth, entriesController.deleteEntrie);

module.exports = router;