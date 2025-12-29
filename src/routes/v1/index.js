import express from 'express';
import testRoute from './TestRoute/index.js';
import authRoute from './AuthRoute/index.js';
import userRoute from './UserRoute/index.js'

const router = express.Router();

router.use('/test', testRoute);
router.use('/auth', authRoute);
router.use('/user',userRoute);

export default router;