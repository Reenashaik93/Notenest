const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('Authorization header missing or invalid:', authHeader); // Debugging log
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Token received:', token); // Debugging log

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Payload:', decoded); // Debugging log
        req.user = decoded.id;
        next();
    } catch (err) {
        console.error('JWT Verification Error:', err.message); // Debugging log
        res.status(401).json({ message: 'Token is not valid', error: err.message });
    }
};

module.exports = auth;
