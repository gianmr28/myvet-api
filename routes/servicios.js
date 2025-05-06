const express = require('express');
const router = express.Router();
const pool = require('../db');

// Obtener todos los servicios
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM servicio');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener un servicio por ID
router.get('/:idservicio', async (req, res) => {
  const { idservicio } = req.params;
  try {
    const result = await pool.query('SELECT * FROM servicio WHERE idservicio = $1', [idservicio]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Servicio no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Agregar un nuevo servicio
router.post('/', async (req, res) => {
  const { nombre, costo, imagen } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO servicio (nombre, costo, imagen) VALUES ($1, $2, $3) RETURNING *',
      [nombre, costo, imagen]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar servicio
router.put('/:idservicio', async (req, res) => {
  const { idservicio } = req.params;
  const { nombre, costo, imagen } = req.body;
  try {
    const result = await pool.query(
      'UPDATE servicio SET nombre = $1, costo = $2, imagen = $3 WHERE idservicio = $4 RETURNING *',
      [nombre, costo, imagen, idservicio]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Servicio no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar servicio
router.delete('/:idservicio', async (req, res) => {
  const { idservicio } = req.params;
  try {
    const result = await pool.query('DELETE FROM servicio WHERE idservicio = $1 RETURNING *', [idservicio]);
    if (result.rows.length > 0) {
      res.json({ message: 'Servicio eliminado' });
    } else {
      res.status(404).json({ message: 'Servicio no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
