import express from 'express';
import { registerUser,loginUser,forgotPassword,resetPassword} from '../../../controller/authController.js';
import upload from '../../../middleware/multer.js';

const router = express.Router();

router.post('/register', upload, registerUser);
router.post('/login', loginUser);
router.put('/forgot-password',forgotPassword)
router.put('/reset-password/:token',resetPassword)
export default router;