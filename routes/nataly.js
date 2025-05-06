const express = require('express');
const router = express.Router();
const pool = require('../db');

// Obtener todos los usuarios
router.get('/', (req, res) => {
    try {
      res.json({ message: 'hola te amo :)' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  