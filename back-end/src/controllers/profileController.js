const User = require('../models/User');
const Score = require('../models/Score');

exports.getProfile = (client) => async (req, res) => {
    const userId = req.user.id;

    try {
        const cacheData = await client.get(`userProfile:${userId}`);
        if (cacheData) {
            return res.json(JSON.parse(cacheData));
        }

        const user = await User.findById(userId).select('username email');
        if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

        const scores = await Score.find({ userId }).select('score updatedAt');
        const simplifiedScores = scores.map(({ score, updatedAt }) => ({ score, updatedAt }));

        const profileData = {
            username: user.username,
            email: user.email,
            scores: simplifiedScores
        };

        // Guardamos en Redis con un tiempo de expiración de 1 hora
        await client.set(`userProfile:${userId}`, JSON.stringify(profileData), { EX: 3600 });

        res.json(profileData);
    } catch (err) {
        console.error('Error en getProfile:', err);
        res.status(500).send('Error en el servidor');
    }
};
