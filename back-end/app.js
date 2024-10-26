const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Cargar las variables de entorno
dotenv.config();

// Crear la instancia de Express
const app = express();
app.use(express.json());

// Conectar con MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
