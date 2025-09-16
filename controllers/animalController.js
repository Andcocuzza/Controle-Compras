const db = require('../db');

// Listar todos os animais
exports.getAllAnimals = (req, res) => {
  db.query('SELECT * FROM animais', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Buscar animal por ID
exports.getAnimalById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM animais WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Animal não encontrado' });
    res.json(results[0]);
  });
};

// Criar novo animal
exports.createAnimal = (req, res) => {
  const { nome, especie, raca, tutor_id } = req.body;
  db.query(
    'INSERT INTO animais (nome, especie, raca, tutor_id) VALUES (?, ?, ?, ?)',
    [nome, especie, raca, tutor_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Animal criado', id: results.insertId });
    }
  );
};

// Atualizar animal
exports.updateAnimal = (req, res) => {
  const { id } = req.params;
  const { nome, especie, idade, raca, tutor_id } = req.body;
 db.query(
    'UPDATE animais SET nome = ?, especie = ?, raca = ?, idade = ?, tutor_id = ? WHERE id = ?',
    [nome, especie, raca, idade, tutor_id, id],
    (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao atualizar animal' });
        }
        res.json({ message: 'Animal atualizado com sucesso' });
    }
);
};

exports.deleteAnimal = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM animais WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Animal deletado com sucesso' });
  });
};



