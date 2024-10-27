const scoreUpdateLimit = {};

exports.updateScore = (client) => async (req, res) => {
    const { score } = req.body;
    const userId = req.user.id;

    if (typeof score !== 'number') {
        return res.status(400).json({ msg: 'El puntaje debe ser un número' });
    }

    const currentTime = Date.now();
    const lastUpdate = scoreUpdateLimit[userId] || 0;

    if (currentTime - lastUpdate < 60000) {
        return res.status(429).json({ msg: 'Espere antes de actualizar nuevamente' });
    }

    scoreUpdateLimit[userId] = currentTime;

    try {
        await client.set(`userScore:${userId}`, score);
        res.json({ msg: 'Puntaje actualizado en Redis' });
    } catch (err) {
        console.error('Error al actualizar el puntaje en Redis:', err); // Agrega un log de error
        res.status(500).send('Error en el servidor');
    }
};
