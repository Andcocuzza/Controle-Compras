const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
const tutorRoutes = require('./routes/tutor');
const animalRoutes = require('./routes/animal');
const servicoRoutes = require('./routes/servico');
const historicoRoutes = require('./routes/historico');

app.use('/tutores', tutorRoutes);
app.use('/animais', animalRoutes);
app.use('/servicos', servicoRoutes);
app.use('/historicos', historicoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
