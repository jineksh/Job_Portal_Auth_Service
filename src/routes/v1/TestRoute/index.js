import express from 'express';
import authenticateToken from '../../../middleware/authenticate.js';

const router = express.Router();

router.get('/', authenticateToken, (req, res, next) => {
    res.status(200).json({ message: 'Test route is working!', user: req.user });
});

export default router;