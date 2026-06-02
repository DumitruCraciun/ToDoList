// view/src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import { getTodos, createTodo, removeTodo } from './util';

const App = () => {
  const [todo, setTodo] = useState({
    description: '',
  });
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState();

  // Create a fetchTodos() function to update the View from Model using getTodos() function from Controller
  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodoList(data);
      setError(null);
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
      setError(null);
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
      setError(null);
    } catch (err) {
      setError('Failed to add todo');
      console.error(err);
    }
  };

  useEffect(() => {
    // Initialize todoList
    fetchTodos();
  }, []);

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={todo.description}
          onChange={(event) => setTodo({ ...todo, description: event.target.value })}
        />
        <button type="submit">Add Todo</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ol>
        {todoList?.map((todoItem) => (
          <li
            key={todoItem.todo_id}
            onClick={() => handleDelete(todoItem.todo_id)}
          >
            {todoItem.description}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default App;