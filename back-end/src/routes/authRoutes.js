const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'El usuario ya existe' });

        user = new User({ username, email, password });
        await user.save();

        //Expiracion de token 
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Contraseña incorrecta' });

        //Expiracion de token 
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
});

// Obtención del perfil de usuario con caché Redis
module.exports = (client) => {
    router.get('/profile/:userId', async (req, res) => {
        const userId = req.params.userId;

        try {
            // Verificar si los datos están en Redis
            const cacheData = await client.get(`userProfile:${userId}`);
            if (cacheData) {
                console.log('Datos de perfil obtenidos de Redis');
                return res.json(JSON.parse(cacheData));
            }

            // Si no están en Redis, consultar MongoDB
            const user = await User.findById(userId).select('-password');
            if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

            // Almacenar datos en Redis con expiración (por ejemplo, 1 hora)
            await client.set(`userProfile:${userId}`, JSON.stringify(user), {
                EX: 3600 // Expira en 1 hora
            });

            console.log('Datos de perfil obtenidos de MongoDB y almacenados en Redis');
            res.json(user);
        } catch (err) {
            console.error('Error al obtener el perfil de usuario:', err);
            res.status(500).send('Error en el servidor');
        }
    });

    return router;
};


