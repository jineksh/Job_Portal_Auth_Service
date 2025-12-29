import { ApiError } from "../errors/index.js";
import getDataUri from "../utils/dataUri.js";
import { uploadToCloudinary } from "../api/uploadApi.js";
import userRepository from "../Repository/userRepsitory.js";
class userService {

    constructor() {
        this.userRepository = new userRepository();
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
            console.log(user);
            return user;
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
}





export default userService;