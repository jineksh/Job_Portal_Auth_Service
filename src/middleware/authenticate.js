import jwt from 'jsonwebtoken';

import { JWT_KEY } from '../config/server.js'

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(' ')[1] : authHeader;
    if (!token) {
        return res.status(401).json(
            {
                error: 'Access denied. No token provided.'
            });
    }

    jwt.verify(token, JWT_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });

        req.user = user;
        req.token = token;
       
        next();
    });


}

export default authenticateToken;