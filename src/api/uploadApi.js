import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const uploadToCloudinary = async (data) => {
    try {
        const response = await axios.post(process.env.uploadService_URL,data);
        console.log('Upload Response:', response.data.data);
        return response.data.data;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error.message);
        throw error;
    }
}