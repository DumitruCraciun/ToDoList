// model/todo.js
const { Pool } = require('pg');

// Folosește DATABASE_URL în loc de variabile separate
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Necesar pentru Render
});

// Inițializează tabela (important!)
const initDB = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS todo (
        todo_id SERIAL PRIMARY KEY,
        description VARCHAR(225) NOT NULL
      );
    `;
    await pool.query(query);
    console.log('✅ Table "todo" is ready');
  } catch (error) {
    console.error('Error creating table:', error);
  }
};

// Creează o nouă sarcină
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

// Obține toate sarcinile
const get = async () => {
  try {
    const result = await pool.query('SELECT * FROM todo ORDER BY todo_id ASC');
    return result.rows;
  } catch (error) {
    console.error('Eroare la get:', error);
    throw error;
  }
};

// Șterge o sarcină după ID
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

// Rulează inițializarea bazei de date
initDB();

// EXPORT
module.exports = {
  create,
  get,
  remove,
};