const Score = require('../models/Score'); 
const User = require('../models/User'); 

// Función para actualizar la puntuación de un usuario
exports.updateScore = async (req, res) => {
    const userId = req.user.id; // Asegúrate de que el usuario esté autenticado
    const { score } = req.body;

    try {
        // Verifica que la puntuación sea un número
        if (typeof score !== 'number') {
            return res.status(400).json({ msg: 'El puntaje debe ser un número' });
        }

        // Guarda la nueva puntuación en la colección de puntuaciones
        const newScore = new Score({ userId, score });
        await newScore.save();

        // Opcional: agrega la puntuación al array de puntuaciones en el modelo de usuario
        await User.findByIdAndUpdate(userId, { $push: { scores: newScore._id } });

        res.json({ msg: 'Puntaje actualizado', newScore });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar el puntaje' });
    }
};

// Función para obtener las puntuaciones de un usuario
exports.getUserScores = async (req, res) => {
    const userId = req.user.id; // Asegúrate de que el usuario esté autenticado

    try {
        const scores = await Score.find({ userId }); // Encuentra todas las puntuaciones del usuario
        res.json(scores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener las puntuaciones' });
    }
};
