const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Token recibido:', token); 
    if (!token) return res.status(401).json({ msg: 'No token, autorización denegada' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Error al verificar el token:', err.message);
        res.status(401).json({ msg: 'Token no es válido' });
    }
};
