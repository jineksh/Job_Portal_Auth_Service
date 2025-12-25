import userService from '../Service/userService.js';
import  ApiResponse  from '../utils/apiResponse.js';

const userServices = new userService();

export const registerUser = async (req,res,next)=>{

    try {
        const user = await userServices.createUser(req.body,req.file);
        return res.status(201).json(new ApiResponse(true, {user},"User registered successfully"));

    } catch (error) {
        next(error);
    }

}


export const loginUser = async(req,res,next)=>{
    try {
        const {user,token} = await userServices.login(req.body);
        return res.status(200).json(new ApiResponse(true, {user,token},"User logged in successfully"));
    } catch (error) {
        next(error);
    }
}