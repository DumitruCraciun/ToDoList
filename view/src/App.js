// view/src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import { getTodos, createTodo, removeTodo } from './util';

const App = () => {
  const [todo, setTodo] = useState({ description: '' });
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState('');

  // Create a fetchTodos() function to update the View from Model data
  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodoList(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch todos');
      console.error(err);
    }
  };

  // Create a handleDelete() function to remove to-do list with matching id
  const handleDelete = async (id) => {
    try {
      await removeTodo(id);
      await fetchTodos();
      setError('');
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
    }
  };

  // Create a handleSubmit() function to add new to-do list
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!todo.description.trim()) {
      setError('Please enter a task');
      return;
    }

    try {
      await createTodo(todo.description);
      setTodo({ description: '' });
      await fetchTodos();
      setError('');
    } catch (err) {
      // Extrage mesajul de eroare din răspunsul serverului
      const errorMessage = err.message || 'Failed to add todo';

      // Dacă eroarea vine de la server (400), afișează mesajul frumos
      if (errorMessage.includes('400') || err.toString().includes('400')) {
        setError('❌ Task contains inappropriate language. Please rephrase.');
      } else {
        setError('Failed to add todo. Please try again.');
      }

      // Nu goli inputul - lasă utilizatorul să modifice textul
      console.error('Error in handleSubmit:', err);
    }
  };

  // Initialize todoList
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <i className="fas fa-check-circle header-icon"></i>
          <h1>Get It Done</h1>
          <p className="tagline">Today's tasks, done today.</p>
        </div>
      </header>

      <main className="app-main">
        <div className="todo-container">
          <form onSubmit={handleSubmit} className="todo-form">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={todo.description}
              onChange={(event) => setTodo({ ...todo, description: event.target.value })}
              className="todo-input"
            />
            <button type="submit" className="add-btn">
              <i className="fas fa-plus"></i> Add Task
            </button>
          </form>

          {error && <div className="error-message"><i className="fas fa-exclamation-triangle"></i> {error}</div>}

          <div className="todo-list-container">
            <h2 className="list-title">
              <i className="fas fa-list"></i> Your Tasks
              <span className="task-count">{todoList.length} task{todoList.length !== 1 ? 's' : ''}</span>
            </h2>
            {todoList.length === 0 ? (
              <div className="empty-state">
                <i className="fas fa-smile-wink"></i>
                <p>Nothing to do? Add a task above!</p>
              </div>
            ) : (
              <ul className="todo-list">
                {todoList.map((todoItem) => (
                  <li key={todoItem.todo_id} className="todo-item">
                    <span className="todo-text">{todoItem.description}</span>
                    <button
                      onClick={() => handleDelete(todoItem.todo_id)}
                      className="delete-btn"
                      title="Delete task"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>&copy; 2026 Get It Done. Created by Dumitru Craciun for portfolio purposes.</p>
          <p className="footer-tech">Built with React, Node.js, Express & PostgreSQL</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
