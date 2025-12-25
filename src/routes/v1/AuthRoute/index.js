import express from 'express';
import { registerUser } from '../../../controller/authController.js';
import upload from '../../../middleware/multer.js';

const router = express.Router();

router.post('/register', upload, registerUser);
export default router;