const express = require('express');
const router = express.Router();

// Aquí irían tus rutas, por ejemplo:
router.get('/', (req, res) => {
  res.json({ message: 'hola nataly te amo mucho c:' });
});

// Exportar el router para usarlo en index.js
module.exports = router;
