import express from 'express';
import testRoute from './TestRoute/index.js';
import authRoute from './AuthRoute/index.js';


const router = express.Router();

router.use('/test', testRoute);
router.use('/auth', authRoute);

export default router;