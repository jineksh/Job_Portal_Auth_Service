import ApiResponse from '../utils/apiResponse.js';
import { ApiError } from '../errors/index.js';
import userService from '../Service/userService.js';

const userServices = new userService();

export const getMyProfile = async (req, res, next) => {
    try {
        const user = await userServices.getMyProfile(req.user);
        return res.status(200).json(
            new ApiResponse(
                200,
                user,
                'User profile fetched successfully'
            )
        );

    } catch (error) {
        next(error);
    }
} 

export const getUserById = async(req,res,next)=>{
    try {
        const id = parseInt(req.params.id);
        console.log(typeof(id))
        const user = await userServices.getUserById(id);
        return res.status(200).json(
            new ApiResponse(
                200,
                user,
                'User profile fetched successfully'
            )
        );
    } catch (error) {
        next(error);
    }
}