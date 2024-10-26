const jwt = require('jsonwebtoken');

// Exporta un middleware de autenticación que verifica el token JWT en cada solicitud
module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    console.log('Token recibido:', token); 
    if (!token) return res.status(401).json({ msg: 'No token, autorización denegada' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log('Usuario decodificado:', req.user);
        next();
    } catch (err) {
        console.error('Error al verificar el token:', err); 
        res.status(401).json({ msg: 'Token no es válido' });
    }
};
