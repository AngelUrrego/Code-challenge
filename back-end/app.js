const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const redis = require('redis');

// Configurar el entorno
dotenv.config();
const app = express();
app.use(express.json());

// Conexión a MongoDB y Redis
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const client = redis.createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
client.connect();

// Importar las rutas y pasar el cliente
const routes = require('./src/routes/index')(client);
app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
