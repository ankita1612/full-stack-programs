const jwt = require('jsonwebtoken');

// Authentication Middleware
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized! No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify token
        req.user = decoded; // Attach user data to request object
        next(); // Pass control to the next function
    } catch (err) {
        console.error('Token verification failed:', err.message);
        res.status(401).json({ message: 'Unauthorized! Invalid token.' });
    }
};

module.exports = authMiddleware;