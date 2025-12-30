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

export const getUserById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        console.log(typeof (id))
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

export const addSkills = async (req, res, next) => {
    try {
        const { email } = req.user;
        const skills = req.body.skills;
        if (!skills || !Array.isArray(skills) || skills.length === 0) {
            throw new ApiError("Skills array is required", 400);
        }
        const user = await userServices.addSkill(email, skills);
        return res.status(200).json(
            new ApiResponse(
                200,
                user,
                'Skill added successfully'
            )
        );

    } catch (error) {
        next(error);
    }
}

export const updateuser = async(req,res,next)=>{
    try {
        const { email } = req.user;
        const updatedUser = await userServices.updateUser(req.body,email);

         return res.status(200).json(
            new ApiResponse(
                200,
                updatedUser,
                'User update successfully'
            )
        );

    } catch (error) {
        next(error);
    }
}

export const updateResume = async(req,res,next)=>{
    try {
        const { email } = req.user;
        const file = req.file;

        const updateResume = await userServices.updateResume(email,file);

        return res.status(200).json(
            new ApiResponse(
                200,
                updateResume,
                'resume update successfully'
            )
        );


    } catch (error) {
        next(error);
    }
}

export const addProfilePicture = async(req,res,next)=>{
    try {
        const file = req.files?.profilePic?.[0];
        const {email} = req.user;
        const user = await userServices.addProfilePic(email,file);

        return res.status(200).json(
            new ApiResponse(
                200,
                user,
                'profile picture add successfully'
            )
        );

    } catch (error) {
        next(error);
    }
}

export const updateProfilePicture = async(req,res,next)=>{
    try {
        const file = req.files?.profilePic?.[0];
        const {email} = req.user;
        const user = await userServices.updateProfilePic(email,file);

        return res.status(200).json(new ApiResponse(
                200,
                user,
                'profile picture update successfully'
            ))
    } catch (error) {
        next(error);
    }
}