import express from 'express';
import { registerUser,loginUser } from '../../../controller/authController.js';
import upload from '../../../middleware/multer.js';

const router = express.Router();

router.post('/register', upload, registerUser);
router.post('/login', loginUser);
export default router;