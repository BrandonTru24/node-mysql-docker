import express from 'express';
import { createPool } from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

// Conexión a la base de datos
const pool = createPool({
    host: process.env.MYSQLDB_HOST,
    user: 'root',
    password: process.env.MYSQLDB_ROOT_PASSWORD,
    port: process.env.MYSQLDB_DOCKER_PORT
});

// Ruta principal
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Ruta para probar la base de datos
app.get('/ping', async (req, res) => {
    const [result] = await pool.query('SELECT NOW()');
    res.json(result[0]);
});

// Iniciar servidor
const port = process.env.NODE_DOCKER_PORT || 3000;
app.listen(port, () => {
    console.log('Server on port', port);
});