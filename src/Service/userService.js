import { ApiError } from "../errors/index.js";
import userRepository from "../Repository/userRepsitory.js";
import userRoleRepository from "../Repository/userRole.js";
import getDataUri from "../utils/dataUri.js";
import { uploadToCloudinary } from "../api/uploadApi.js";
import bcrypt from "bcrypt";

class userService {

    constructor() {
        this.userRepository = new userRepository();
        this.userRoleRepository = new userRoleRepository();
    }

    async createUser(data, file) {
        try {
            if (!data.role || !data.name || !data.email || !data.password) {
                throw new ApiError("All fields are required", 400);
            }
            if (data.role === 'job_seeker') {
                if (!file) {
                    throw new ApiError("Resume is required for job seekers", 400);
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
                throw new ApiError(400, "Invalid role");
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
            if (error instanceof ApiError) throw error;
            throw new ApiError(error.message || "Internal Server Error in User Service", 500);
        }
    }


}

export default userService;