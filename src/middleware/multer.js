import multer from 'multer';
import { ValidationError } from '../errors/index.js'; // Extension ka dhyan rakhein

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'profilePic') {
        if (!file.mimetype.startsWith('image/')) {
            return cb(
                new ValidationError('Profile picture must be an image'),
                false
            );
        }
    }

    if (file.fieldname === 'resume') {
        if (file.mimetype !== 'application/pdf') {
            return cb(
                new ValidationError('Resume must be a PDF'),
                false
            );
        }
    }

    cb(null, true);
};


const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter, // <--- Ye pass karna zaroori hai!
    limits: { fileSize: 10 * 1024 * 1024 } 
}).fields([
    {name : 'profilePic',maxCount : 1},
    {name : 'resume' , maxCount : 1}
]); 

export default upload;