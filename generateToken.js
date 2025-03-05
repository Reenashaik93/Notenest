require('dotenv').config(); // Load environment variables
const jwt = require('jsonwebtoken');

const payload = {
    id: "reenashaik02", // Replace with an actual user ID from your database
};

const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

console.log('Generated Token:', token);
