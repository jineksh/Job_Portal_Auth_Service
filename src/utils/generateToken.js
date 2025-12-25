import jwt  from 'jsonwebtoken';

import {JWT_KEY} from '../config/server.js';

const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
    };
    console.log("Generating token with payload:", payload);

    const token = jwt.sign(payload, JWT_KEY, { expiresIn: '30d' });
    return token;
}

export default  generateToken;