const express = require('express');
const router = express.Router();
const pool = require('../db');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuario');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener un usuario por ID
router.get('/:idusuario', async (req, res) => {
  const { idusuario } = req.params;
  try {
    const result = await pool.query('SELECT * FROM usuario WHERE idusuario = $1', [idusuario]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Agregar un nuevo usuario
router.post('/', async (req, res) => {
  const { nombre, apellido, fechanacimiento, celular, correo, contrasena } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO usuario (nombre, apellido, fechanacimiento, celular, correo, contrasena) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nombre, apellido, fechanacimiento, celular, correo, contrasena]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar usuario
router.put('/:idusuario', async (req, res) => {
  const { idusuario } = req.params;
  const { nombre, apellido, fechanacimiento, celular, correo, contrasena } = req.body;
  try {
    const result = await pool.query(
      'UPDATE usuario SET nombre = $1, apellido = $2, fechanacimiento = $3, celular = $4, correo = $5, contrasena = $6 WHERE idusuario = $7 RETURNING *',
      [nombre, apellido, fechanacimiento, celular, correo, contrasena, idusuario]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar usuario
router.delete('/:idusuario', async (req, res) => {
  const { idusuario } = req.params;
  try {
    const result = await pool.query('DELETE FROM usuario WHERE idusuario = $1 RETURNING *', [idusuario]);
    if (result.rows.length > 0) {
      res.json({ message: 'Usuario eliminado' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
