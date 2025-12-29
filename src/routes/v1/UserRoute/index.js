import express from 'express'
import authenticateToken from '../../../middleware/authenticate.js'
import { getMyProfile,getUserById , addSkills} from '../../../controller/userController.js';
import authService from '../../../Service/authService.js';


const router = express.Router();

router.get('/my-profile',authenticateToken,getMyProfile);
router.get('/:id',getUserById);
router.post('/add-skills',authenticateToken,addSkills);

export default router;