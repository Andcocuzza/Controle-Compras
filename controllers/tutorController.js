const db = require('../db');

// Listar todos os tutores
exports.getAllTutors = (req, res) => {
  db.query('SELECT * FROM tutores', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Buscar tutor por ID
exports.getTutorById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM tutores WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Tutor não encontrado' });
    res.json(results[0]);
  });
};

// Criar novo tutor
exports.createTutor = (req, res) => {
  const { nome, telefone, email } = req.body;
  db.query('INSERT INTO tutores (nome, telefone, email) VALUES (?, ?, ?)', [nome, telefone, email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Tutor criado', id: results.insertId });
  });
};

// Atualizar tutor
exports.updateTutor = (req, res) => {
  const { id } = req.params;
  const { nome, telefone, email } = req.body;
  db.query('UPDATE tutores SET nome = ?, telefone = ?, email = ? WHERE id = ?', [nome, telefone, email, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Tutor atualizado' });
  });
};

// Deletar tutor
exports.deleteTutor = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tutores WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Tutor deletado' });
  });
};
