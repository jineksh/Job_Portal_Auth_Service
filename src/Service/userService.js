import { ApiError } from "../errors/index.js";
import getDataUri from "../utils/dataUri.js";
import { uploadToCloudinary } from "../api/uploadApi.js";
import userRepository from "../Repository/userRepsitory.js";
import skillRepository from "../Repository/skillRepository.js";
class userService {

    constructor() {
        this.userRepository = new userRepository();
        this.skillRepository = new skillRepository();
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

    async addSkill(email,skillNames){
        try {
            const user = await this.userRepository.getUserByEmail(email);
            if(!user){
                throw new ApiError("User with given email does not exist", 400);
            }
            const skills = await this.skillRepository.findORCreateSkill(skillNames);

            console.log('userSkills :'+skills);

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
}





export default userService;