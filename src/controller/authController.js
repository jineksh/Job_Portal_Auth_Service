import userService from '../Service/userService.js';
import  ApiResponse  from '../utils/apiResponse.js';
import { ApiError } from '../errors/index.js';

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

export const forgotPassword = async(req,res,next)=>{
    try {
        const {email} = req.body;
        await userServices.forgotPassword(email);
        return res.status(200).json(new ApiResponse(true, null, "Password reset email sent successfully"));
    } catch (error) {
        return next(error);
    }
}

export const resetPassword = async(req,res,next)=>{
    try {
        const {password} = req.body;
        const token = req.params.token;

        if(!password){
            throw new ApiError("Password is required", 400);
        }
        await userServices.resetPassword(token,password);

        return res.status(200).json(new ApiResponse(true,null,"Password updated successfull"));
    } catch (error) {
        next(error);
    }
}

