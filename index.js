// index.js - ROOT: Entry point for the Express server

const express = require('express');
require('dotenv').config();
const cors = require('cors');  
const todoRoutes = require('./routes/todo');

// Running express server
const app = express();
const port = process.env.PORT || 8000;

// Middleware - CORS trebuie să fie primul!
app.use(cors());  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route middlewares
app.use('/api', todoRoutes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
