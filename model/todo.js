// model/todo.js
const { Pool } = require('pg');

// Connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

// Creazi tabela "todo" dacă nu există deja
const initDB = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS todo (
      todo_id SERIAL PRIMARY KEY,
      description VARCHAR(225) NOT NULL
    );
  `;
  await pool.query(query);
  console.log('✅ Table "todo" is ready');
};

// Apelează funcția la pornire
initDB().catch(console.error);

// INSERT function - adauga o noua sarcina in baza de date
const create = async (description) => {
  try {
    const result = await pool.query(
      'INSERT INTO todo (description) VALUES ($1) RETURNING *',
      [description]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Eroare la create:', error);
    throw error;
  }
};

// GET function - preia toate sarcinile din baza de date
const get = async () => {
  try {
    const result = await pool.query('SELECT * FROM todo');
    return result.rows;
  } catch (error) {
    console.error('Eroare la get:', error);
    throw error;
  }
};

// DELETE function - sterge o sarcina dupa ID
const remove = async (id) => {
  try {
    const result = await pool.query(
      'DELETE FROM todo WHERE todo_id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Eroare la remove:', error);
    throw error;
  }
};

// EXPORT - exporta functiile pentru a fi folosite in alte parti ale aplicatiei
module.exports = {
  create,
  get,
  remove,
};