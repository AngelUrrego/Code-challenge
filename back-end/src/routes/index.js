const express = require('express');
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const scoreController = require('../controllers/scoreController');
const verifyToken = require('../middleware/authMiddleware'); // Middleware para el token JWT

module.exports = (client) => {
    const router = express.Router();

    // Rutas de autenticación
    router.post('/register', authController.register);
    router.post('/login', authController.login);

    // Ruta de perfil
    router.get('/profile', verifyToken, profileController.getProfile(client));

    // Ruta de puntaje
    router.post('/update-score', verifyToken, scoreController.updateScore(client)); // Pasamos client

    // Ruta para obtener las puntuaciones del usuario
    router.get('/score', verifyToken, scoreController.getUserScores(client)); // Pasamos client

    return router;
};
