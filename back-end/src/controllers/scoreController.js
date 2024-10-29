const Score = require('../models/Score'); 
const User = require('../models/User'); 

// Función para actualizar la puntuación de un usuario
exports.updateScore = (client) => async (req, res) => {
    const userId = req.user.id;
    const { score } = req.body;

    try {
        if (typeof score !== 'number') {
            return res.status(400).json({ msg: 'El puntaje debe ser un número' });
        }

        // Guarda la nueva puntuación en la base de datos
        const newScore = new Score({ userId, score });
        await newScore.save();

        // Agrega el ID de la nueva puntuación en el modelo de usuario
        await User.findByIdAndUpdate(userId, { $push: { scores: newScore._id } });

        // Invalida la caché en Redis para que el perfil se regenere con los datos actualizados
        await client.del(`userProfile:${userId}`);

        res.json({ msg: 'Puntaje actualizado', newScore });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar el puntaje' });
    }
};


// Función para obtener las puntuaciones de un usuario
exports.getUserScores = (client) => async (req, res) => {
    const userId = req.user.id;

    try {
        const cachedScores = await client.get(`userScores:${userId}`);
        if (cachedScores) {
            return res.json(JSON.parse(cachedScores));
        }

        const scores = await Score.find({ userId });
        await client.set(`userScores:${userId}`, JSON.stringify(scores), { EX: 3600 });

        res.json(scores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener las puntuaciones' });
    }
};
