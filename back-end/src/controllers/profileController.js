const User = require('../models/User');

exports.getProfile = (client) => async (req, res) => {
    const userId = req.params.userId;

    try {
        const cacheData = await client.get(`userProfile:${userId}`);
        if (cacheData) {
            return res.json(JSON.parse(cacheData));
        }

        const user = await User.findById(userId).select('-password');
        if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

        await client.set(`userProfile:${userId}`, JSON.stringify(user), { EX: 3600 });
        res.json(user);
    } catch (err) {
        res.status(500).send('Error en el servidor');
    }
};
