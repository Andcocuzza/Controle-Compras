const db = require('../db');

// Listar todos os serviços
exports.getAllServicos = (req, res) => {
  db.query('SELECT * FROM servicos', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Buscar serviço por ID
exports.getServicoById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM servicos WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Serviço não encontrado' });
    res.json(results[0]);
  });
};

// Criar novo serviço
exports.createServico = (req, res) => {
  const { nome, preco } = req.body;
  db.query(
    'INSERT INTO servicos (nome, preco) VALUES (?, ?)',
    [nome, preco],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Serviço criado', id: results.insertId });
    }
  );
};

// Atualizar serviço
exports.updateServico = (req, res) => {
  const { id } = req.params;
  const { nome, preco } = req.body;
  db.query('UPDATE servicos SET nome = ?, preco = ? WHERE id = ?', [nome, preco, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Serviço atualizado' });
  });
};

// Deletar serviço
exports.deleteServico = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM servicos WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Serviço deletado' });
  });
};
