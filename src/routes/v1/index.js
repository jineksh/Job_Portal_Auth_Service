import express from 'express';
import testRoute from './TestRoute/index.js';


const router = express.Router();

router.use('/test', testRoute);

export default router;