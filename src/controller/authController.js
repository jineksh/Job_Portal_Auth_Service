import authService from '../Service/authService.js';
import  ApiResponse  from '../utils/apiResponse.js';
import { ApiError } from '../errors/index.js';

const authServices = new authService();

export const registerUser = async (req,res,next)=>{

    try {
        console.log("Request Body:", req.body);
        const file = req.files?.resume?.[0];
        const user = await authServices.createUser(req.body,file);
        return res.status(201).json(new ApiResponse(true, {user},"User registered successfully"));

    } catch (error) {
        next(error);
    }

}


export const loginUser = async(req,res,next)=>{
    try {
        const {user,token} = await authServices.login(req.body);
        return res.status(200).json(new ApiResponse(true, {user,token},"User logged in successfully"));
    } catch (error) {
        next(error);
    }
}

export const forgotPassword = async(req,res,next)=>{
    try {
        console.log("Forgot Password Request Body:", req.body

        );
        const {email} = req.body;
        console.log("Email for password reset:", email);
        await authServices.forgotPassword(email);
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
        await authServices.resetPassword(token,password);

        return res.status(200).json(new ApiResponse(true,null,"Password updated successfull"));
    } catch (error) {
        next(error);
    }
}

