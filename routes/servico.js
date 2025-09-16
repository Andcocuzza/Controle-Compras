const express = require('express');
const router = express.Router();
const servicoController = require('../controllers/servicoController');

// Rotas de serviços
router.get('/', servicoController.getAllServicos);         // Listar todos os serviços
router.get('/:id', servicoController.getServicoById);      // Buscar serviço por ID
router.post('/', servicoController.createServico);         // Criar novo serviço
router.put('/:id', servicoController.updateServico);       // Atualizar serviço
router.delete('/:id', servicoController.deleteServico);    // Deletar serviço

module.exports = router;
