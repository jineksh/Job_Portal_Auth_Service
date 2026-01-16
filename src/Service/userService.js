import { ApiError } from "../errors/index.js";
import getDataUri from "../utils/dataUri.js";
import { uploadToCloudinary } from "../api/uploadApi.js";
import userRepository from "../Repository/userRepsitory.js";
import skillRepository from "../Repository/skillRepository.js";
import userRoleRepository from "../Repository/userRole.js";
import { getUniqueHostnamesFromOptions } from "ioredis/built/cluster/util.js";
import { createApplication, getApplications } from '../api/applicationApi.js'
class userService {

    constructor() {
        this.userRepository = new userRepository();
        this.skillRepository = new skillRepository();
        this.userRoleRepository = new userRoleRepository();
    }

    async getMyProfile(userData) {
        try {
            const user = await this.userRepository.getMyProfile(userData);
            return user;
        } catch (error) {
            console.error('[UserService:getMyProfile]', error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(
                'Failed to fetch user profile',
                500,
                error
            );
        }
    }

    async getUserById(id) {
        try {
            const user = await this.userRepository.getUserById(id);
            if (!user) {
                throw new ApiError("User not found", 404);
            }
            return user; // Doubt
        } catch (error) {
            console.error('[UserService:getUserById]', error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(
                'Failed to fetch user profile',
                500,
                error
            );
        }
    }

    async addSkill(email, skillNames) {
        try {
            const user = await this.userRepository.getUserByEmail(email);
            if (!user) {
                throw new ApiError("User with given email does not exist", 400);
            }
            const skills = await this.skillRepository.findORCreateSkill(skillNames);

            console.log('userSkills :' + skills);

            await user.addSkills(skills);

            const updatedUser = await this.userRepository.getUserById(user.id);

            return updatedUser;

        } catch (error) {
            console.error('[UserService:addskill]', error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(
                'Failed to add Skill',
                500,
                error
            );
        }
    }

    async updateUser(data, email) {
        try {
            const updateData = {};
            if (data.name !== undefined) updateData.name = data.name;
            if (data.bio !== undefined) updateData.bio = data.bio;
            if (data.phoneNum !== undefined) updateData.phoneNum = data.phoneNum;

            if (Object.keys(updateData).length === 0) {
                throw new ApiError("Nothing to update", 400);
            }

            const updatedUser = await this.userRepository.updateUser(updateData, email);

            if (!updatedUser) {
                throw new ApiError("User not found", 404);
            }

            return updatedUser;

        } catch (error) {
            console.error('[UserService:updateUser]', error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(
                'Failed to updateUser',
                500,
                error
            );
        }
    }

    async updateResume(email, file) {
        try {
            const user = await this.userRepository.getUserByEmail(email);

            if (!user) {
                throw new ApiError("User not found", 404);
            }

            if (!file) {
                throw new ApiError("resume Is required", 404);
            }

            const fileUri = getDataUri(file);

            const payload = {
                buffer: fileUri.content,
                public_id: user.resumePublicId || undefined
            };

            const updateResponse = await uploadToCloudinary(payload);

            if (!updateResponse || !updateResponse.url) {
                throw new ApiError("Failed to update resume", 500);
            }

            user.resumePublicId = updateResponse.public_id;
            user.resume = updateResponse.url;

            await user.save();

            const userJson = user.toJSON();
            delete userJson.password;

            return userJson;

        } catch (error) {
            console.error('[UserService:updateResume]', error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(
                'Failed to update resume',
                500,
                error
            );
        }
    }

    async addProfilePic(email, profilePic) {
        try {
            if (!profilePic) {
                throw new ApiError("profile picture is required", 404);
            }

            const user = await this.userRepository.getUserByEmail(email);
            if (!user) {
                throw new ApiError("User not found", 404);
            }

            const picUri = getDataUri(profilePic);

            const payload = {
                buffer: picUri.content
            }

            const uploadResponse = await uploadToCloudinary(payload);

            if (!uploadResponse || !uploadResponse.url) {
                throw new ApiError("Failed to add profile picture", 500);
            }

            user.profilePicPublicId = uploadResponse.public_id;
            user.profilePic = uploadResponse.url;

            await user.save();

            const userJson = user.toJSON();
            delete userJson.password;

            return userJson;
        } catch (error) {
            console.error('[UserService:addprofilepicture]', error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(
                'Failed to add profile picture',
                500,
                error
            );
        }
    }

    async updateProfilePic(email, file) {
        try {
            if (!file) {
                throw new ApiError("profile picture is required", 404);
            }

            const user = await this.userRepository.getUserByEmail(email);

            if (!user) {
                throw new ApiError("User not found", 404);
            }

            const fileuri = getDataUri(file);

            const payload = {
                buffer: fileuri.content,
                public_id: user.profilePicPublicId
            }

            const updateResponse = await uploadToCloudinary(payload);

            if (!updateResponse || !updateResponse.url) {
                throw new ApiError("Failed to update profile picture", 500);
            }

            user.profilePicPublicId = updateResponse.public_id;
            user.profilePic = updateResponse.url;

            await user.save();

            const userJson = user.toJSON();
            delete userJson.password;

            return user;

        } catch (error) {
            console.error('[UserService:addprofilepicture]', error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(
                'Failed to add profile picture',
                500,
                error
            );
        }
    }

    async applyForJob(jobId, userId, token) {
        try {
            const user = await this.userRepository.getUserById(userId);

            console.log(token);

            console.log(user);

            if (!user) {
                throw new ApiError("User with given id does not exist", 400);
            }

            if (user.role.name !== 'job_seeker') {
                throw new ApiError("only job seeker can apply for the job", 400);
            }

            const resume = user.resume;

            if (!resume) {
                throw new ApiError('please upload resume in your profile for apply job', 404);
            }

            const payload = {
                job_id: jobId,
                applicant_id: userId,
                resume: resume
            }

            const response = await createApplication(payload, token);

            if (!response.success) {
                // Optional: throw specific error from Job Service
                throw new ApiError(
                    response.message || "Failed to create application in Job Service",
                    response.statusCode || 500
                );
            }

            return response.data;

        } catch (error) {
            console.error('[UserService:applyforJob]', error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(
                'Failed to create your job apply application',
                500,
                error
            );
        }
    }

    async getAllApplication(userId, token) {
        try {

            const user = await this.userRepository.getUserById(userId);
            if (!user) {
                throw new ApiError('User not found', 404);
            }

            const response = await getApplications(token);

            if (!response.success) {
                throw new ApiError(
                    response.message || "Failed to get applications from Job Service",
                    response.statusCode || 500
                );
            }

            if (response.success && response.data.length === 0) {
                return [];
            }

            return response.data;

        } catch (error) {
            console.error('[UserService:getAllApplications]', error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(
                'Failed to get your job application',
                500,
                error
            );
        }
    }

}





export default userService;