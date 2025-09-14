// routes/animal.js
const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');

// Rotas para animais
router.get('/', animalController.getAllAnimals); // Listar todos os animais
router.get('/:id', animalController.getAnimalById); // Buscar animal pelo ID
router.post('/', animalController.createAnimal); // Criar um novo animal
router.put('/:id', animalController.updateAnimal); // Atualizar animal pelo ID
router.delete('/:id', animalController.deleteAnimal); // Deletar animal pelo ID

module.exports = router;
