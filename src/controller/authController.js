import userService from '../Service/userService.js';
import  ApiResponse  from '../utils/apiResponse.js';

const userServices = new userService();

export const registerUser = async (req,res,next)=>{

    try {
        const user = await userServices.createUser(req.body,req.file);
        return res.status(201).json(new ApiResponse(true, "User registered successfully", {user}));

    } catch (error) {
        next(error);
    }

}