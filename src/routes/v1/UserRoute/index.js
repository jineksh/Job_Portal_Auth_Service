import express from 'express'
import authenticateToken from '../../../middleware/authenticate.js'
import { getMyProfile,getUserById , addSkills,updateuser,updateResume,addProfilePicture,updateProfilePicture,applyJob,getAllApplications} from '../../../controller/userController.js';
import upload from '../../../middleware/multer.js';
import authService from '../../../Service/authService.js';


const router = express.Router();

router.get('/my-profile',authenticateToken,getMyProfile);
router.get('/:id',getUserById);
router.post('/add-skills',authenticateToken,addSkills);
router.patch('/profile',authenticateToken,updateuser);
router.patch('/update-resume',authenticateToken,upload,updateResume);
router.post('/add-profilePic',authenticateToken,upload,addProfilePicture);
router.patch('/profile-picture',authenticateToken,upload,updateProfilePicture);
router.post('/apply/:jobid',authenticateToken,applyJob);
router.get('/me/applications',authenticateToken,getAllApplications);

export default router;