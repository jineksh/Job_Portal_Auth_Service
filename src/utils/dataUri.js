import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
    const parser = new DataUriParser();
    
    // path.extname file ka extension nikalta hai (e.g., .pdf, .jpg)
    const extName = path.extname(file.originalname).toString();
    
    // Ye buffer ko base64 format mein convert karke return karta hai
    return parser.format(extName, file.buffer);
};

export default getDataUri;