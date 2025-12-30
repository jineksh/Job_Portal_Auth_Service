import express from 'express'
import authenticateToken from '../../../middleware/authenticate.js'
import { getMyProfile,getUserById , addSkills,updateuser,updateResume} from '../../../controller/userController.js';
import upload from '../../../middleware/multer.js';
import authService from '../../../Service/authService.js';


const router = express.Router();

router.get('/my-profile',authenticateToken,getMyProfile);
router.get('/:id',getUserById);
router.post('/add-skills',authenticateToken,addSkills);
router.patch('/profile',authenticateToken,updateuser);
router.patch('/update-resume',authenticateToken,upload,updateResume);

export default router;