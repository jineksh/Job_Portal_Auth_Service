import { ApiError } from "../errors/index.js";
import userRepository from "../Repository/userRepsitory.js";
import userRoleRepository from "../Repository/userRole.js";
import getDataUri from "../utils/dataUri.js";
import { uploadToCloudinary } from "../api/uploadApi.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt";
import { forgotPasswordTemplate } from '../utils/emailTemplate.js'
import emailProducer from "../producers/email.js";
import redisConnection from "../config/redis.js";

class authService {

    constructor() {
        this.userRepository = new userRepository();
        this.userRoleRepository = new userRoleRepository();
    }

    async createUser(data, file) {
        try {
            if (!data.role || !data.name || !data.email || !data.password) {
                throw new ApiError('All fields are required', 400);
            }
            if (data.role === 'job_seeker') {
                if (!file) {
                    throw new ApiError('Resume is required for job seekers', 400);
                }

                const fileUri = getDataUri(file);

                // create a upload payload
                const uploadPayload = {
                    buffer: fileUri.content,
                }

                // upload to cloudinary
                const uploadResponse = await uploadToCloudinary(uploadPayload);
                if (!uploadResponse || !uploadResponse.url) {
                    throw new ApiError("Failed to upload resume", 500);
                }

                // set resume url and public id to user data
                data.resume = uploadResponse.url;
                data.resumePublicId = uploadResponse.public_id;
            }


            // get role by name
            const role = await this.userRoleRepository.getRolebyName(data.role);
            console.log("Role fetched:", role);
            if (!role) {
                throw new ApiError('Invalid role', 400);
            }

            // hash password
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);

            // set role id to user data
            data.roleId = role.id;
            console.log("User data before creation:", data);
            const user = await this.userRepository.createUser(data);
            console.log("User created:", user);
            return user;

        }
        catch (error) {
            console.error('[UserService:createUser]', error);

            if (error instanceof ApiError) {
                throw error;
            }

            throw new ApiError(
                'Failed to create user',
                500,
                error
            );
        }
    }

    async login(data) {
        try {
            const user = await this.userRepository.getUserByEmail(data.email);
            if (!user) {
                throw new ApiError("Invalid email or password", 400);
            }
            
            console.log("User fetched for login:", user);
            console.log(user.password, data.password);
            const isPasswordValid = await bcrypt.compare(data.password, user.password);
            if (!isPasswordValid) {
                throw new ApiError("Invalid email or password", 400);
            }

            const token = await generateToken(user);

            return {
                user,
                token
            }

        } catch (error) {
            console.error('[UserService:LoginUser]', error);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(
                'Failed to login user',
                500,
                error
            );

        }

    }

    async forgotPassword(email) {
        try {
            const user = await this.userRepository.getUserByEmail(email);
            if (!user) {
                throw new ApiError("User with given email does not exist", 400);
            }
            const resetToken = await generateToken(user);

            const resetLink = `${process.env.FRONTEND_URL}/reset/${resetToken}`;

            // send email
            const emailPayload = {
                to: user.email,
                subject: "Password Reset Request",
                html: forgotPasswordTemplate(resetLink)
            };

            emailProducer(emailPayload);

            await redisConnection.set(`forgot:${resetToken}`, user.email);

            return { message: "Password reset link sent to your email" };

        } catch (error) {
            console.error('[UserService:ForgotPassword]', error);

            if (error instanceof ApiError) {
                throw error;
            }

            throw new ApiError(
                'Failed to process forgot password request',
                500,
                error
            );
        }
    }

    async resetPassword(token, password) {
        try {
            const email = await redisConnection.get(`forgot:${token}`);

            if (!email) {
                throw new ApiError("Invalid or expired token", 400);
            }

            const updatePassword = this.userRepository.updatePassword(password, email);

            if (!updatePassword) {
                throw new ApiError("User with given email does not exist", 400);
            }

            await redisConnection.del(`forgot:${token}`);

            return;
        } catch (error) {
            console.error('[UserService:ResetPassword]', error);

            if (error instanceof ApiError) {
                throw error;
            }

            throw new ApiError(
                'Failed to reset password',
                500,
                error
            );
        }
    }
}




export default authService;