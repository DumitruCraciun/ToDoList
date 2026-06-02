// routes/todo.js
const express = require('express');
const { createTodo, readTodo, removeTodo } = require('../controller/index');

const router = express.Router();

// POST - creează o nouă sarcină
router.post('/todo/create', createTodo);

// GET - obține toate sarcinile
router.get('/todos', readTodo);

// DELETE - șterge o sarcină după ID
router.delete('/todo/:id', removeTodo);

module.exports = router;