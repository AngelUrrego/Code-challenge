const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const redis = require('redis');


// Cargar las variables de entorno
dotenv.config();

// Crear la instancia de Express
const app = express();
app.use(express.json());

// Conecta con MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));



// Crear el cliente de Redis
const client = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  });
  
// Manejar eventos del cliente de Redis
client.on('connect', () => console.log('Conectado a Redis'));
client.on('error', (err) => console.error('Error en Redis:', err));
  
// Conectar a Redis
(async () => {
    try {
      await client.connect();
      console.log('Conectado a Redis');
    } catch (err) {
      console.error('Error al intentar conectar:', err);
    }
  })();
  
  // Importar las rutas y pasar el cliente
const authRoutes = require('./src/routes/authRoutes')(client);
  

// Conectar las rutas
app.use('/api', authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});


module.exports = { app, client }; // exportar el cliente
