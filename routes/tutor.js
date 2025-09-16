const express = require('express');
const router = express.Router();
const tutorController = require('../controllers/tutorController');

// Rotas CRUD
router.get('/', tutorController.getAllTutors);
router.get('/:id', tutorController.getTutorById);
router.post('/', tutorController.createTutor);
router.put('/:id', tutorController.updateTutor);
router.delete('/:id', tutorController.deleteTutor);

module.exports = router;
