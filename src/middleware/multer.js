import multer from 'multer';
import { ValidationError } from '../errors/index.js'; // Extension ka dhyan rakhein

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        // Aapka custom error class trigger hoga
        cb(new ValidationError('Invalid file type. Only PDF and Images are allowed!'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter, // <--- Ye pass karna zaroori hai!
    limits: { fileSize: 10 * 1024 * 1024 } 
}).single('resume'); 

export default upload;