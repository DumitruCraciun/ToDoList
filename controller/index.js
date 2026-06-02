// controller/index.js
const { create, get, remove } = require('../model/todo');

// CREATE - pentru a adauga un nou todo
const createTodo = async (req, res) => {
  try {
    const { description } = req.body;
    
    if (!description) {
      res.status(400).json({ error: 'Description is required' });
      return;
    }
    
    const newTodo = await create(description);
    res.status(201).json(newTodo);
    
  } catch (error) {
    console.error('Error in createTodo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// READ(GET) - pentru a obține toate todo-urile
const readTodo = async (req, res) => {
  try {
    const todos = await get();
    res.status(200).json(todos);
  } catch (error) {
    console.error('Error in readTodo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// DELETE - pentru a șterge un todo după ID
const removeTodo = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      res.status(400).json({ error: 'ID is required' });
      return;
    }
    
    const deletedTodo = await remove(id);
    
    if (!deletedTodo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }
    
    res.status(200).json({ message: 'Todo deleted successfully', todo: deletedTodo });
    
  } catch (error) {
    console.error('Error in removeTodo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// EXPORT - exportă funcțiile pentru a fi folosite în router
module.exports = {
  createTodo,
  readTodo,
  removeTodo,
};