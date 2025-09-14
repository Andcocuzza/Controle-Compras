const db = require('../db');

// Listar todos os históricos
exports.getAllHistoricos = (req, res) => {
  db.query('SELECT * FROM historicos', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Buscar histórico por ID
exports.getHistoricoById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM historicos WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Histórico não encontrado' });
    res.json(results[0]);
  });
};

// Criar novo histórico
exports.createHistorico = (req, res) => {
  const { animal_id, servico_id, data } = req.body;
  db.query(
    'INSERT INTO historicos (animal_id, servico_id, data) VALUES (?, ?, ?)',
    [animal_id, servico_id, data],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Histórico criado', id: results.insertId });
    }
  );
};

// Atualizar histórico
exports.updateHistorico = (req, res) => {
  const { id } = req.params;
  const { animal_id, servico_id, data } = req.body;
  db.query(
    'UPDATE historicos SET animal_id = ?, servico_id = ?, data = ? WHERE id = ?',
    [animal_id, servico_id, data, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Histórico atualizado' });
    }
  );
};

// Deletar histórico
exports.deleteHistorico = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM historicos WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Histórico deletado' });
  });
};
