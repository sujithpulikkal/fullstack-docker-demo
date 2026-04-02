const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: 'db', // service name in docker-compose
  database: process.env.POSTGRES_DB || 'myappdb',
  password: process.env.POSTGRES_PASSWORD || 'password',
  port: 5432,
});

app.get('/api/users', async (req, res) => {
  const result = await pool.query('SELECT * FROM users');
  res.json(result.rows);
});

app.listen(5000, () => console.log('Backend running on port 5000'));

