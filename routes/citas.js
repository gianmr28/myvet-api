const express = require('express');
const router = express.Router();
const pool = require('../db');

// Obtener todas las citas
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cita');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener una cita por ID
router.get('/:idcita', async (req, res) => {
  const { idcita } = req.params;
  try {
    const result = await pool.query('SELECT * FROM cita WHERE idcita = $1', [idcita]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Cita no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Agregar una nueva cita
router.post('/', async (req, res) => {
  const { idusuario, idservicio, nombremascota, edadmascota, tipomascota, localidad, fecha, hora } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO cita (idusuario, idservicio, nombremascota, edadmascota, tipomascota, localidad, fecha, hora) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [idusuario, idservicio, nombremascota, edadmascota, tipomascota, localidad, fecha, hora]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar cita
router.put('/:idcita', async (req, res) => {
  const { idcita } = req.params;
  const { idusuario, idservicio, nombremascota, edadmascota, tipomascota, localidad, fecha, hora } = req.body;
  try {
    const result = await pool.query(
      'UPDATE cita SET idusuario = $1, idservicio = $2, nombremascota = $3, edadmascota = $4, tipomascota = $5, localidad = $6, fecha = $7, hora = $8 WHERE idcita = $9 RETURNING *',
      [idusuario, idservicio, nombremascota, edadmascota, tipomascota, localidad, fecha, hora, idcita]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Cita no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar cita
router.delete('/:idcita', async (req, res) => {
  const { idcita } = req.params;
  try {
    const result = await pool.query('DELETE FROM cita WHERE idcita = $1 RETURNING *', [idcita]);
    if (result.rows.length > 0) {
      res.json({ message: 'Cita eliminada' });
    } else {
      res.status(404).json({ message: 'Cita no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
