// view/src/util/index.js

// API base URL - backend-ul rulează pe portul 8000
const API_URL = 'http://localhost:8000/api';

// POST - creează un nou todo (acum trimite JSON, nu FormData)
export const createTodo = async (todo) => {
  try {
    const response = await fetch(`${API_URL}/todo/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description: todo }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in createTodo:', error);
    throw error;
  }
};

// GET - obține toate todo-urile
export const getTodos = async () => {
  try {
    const response = await fetch(`${API_URL}/todos`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in getTodos:', error);
    throw error;
  }
};

// DELETE - șterge un todo după ID
export const removeTodo = async (id) => {
  try {
    const response = await fetch(`${API_URL}/todo/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in removeTodo:', error);
    throw error;
  }
};