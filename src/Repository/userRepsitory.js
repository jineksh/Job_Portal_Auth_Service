import db from '../models/index.js';
import { DatabaseError } from '../errors/index.js';
import bcrypt from "bcrypt";

const { User, Role } = db;

class userRepository {

    async createUser(data) {
        try {
            const user = await User.create(data);
            return user;
        }
        catch (error) {
            throw new DatabaseError('Failed to create user: ' + error.message);
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await User.findOne({ email });
            return user;
        }
        catch (error) {
            throw new DatabaseError('Failed to get user by email: ' + error.message);
        }
    }

    async updatePassword(password, email) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const [updatedRows] = await User.update(
                { password: hashedPassword },
                { where: { email } }
            );

            if (updatedRows === 0) {
                throw new DatabaseError("User not found or password not updated");
            }

            console.log("✅ Password updated successfully");
            return true;
        } catch (error) {
            throw new DatabaseError('Failed to get user by email: ' + error.message);
        }
    }
}

export default userRepository;