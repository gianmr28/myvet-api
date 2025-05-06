const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Rutas
app.use('/usuarios', require('./routes/usuarios'));
app.use('/servicios', require('./routes/servicios'));
app.use('/citas', require('./routes/citas'));

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});