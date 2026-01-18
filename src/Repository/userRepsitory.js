import db from '../models/index.js';
import { DatabaseError } from '../errors/index.js';
import bcrypt from "bcrypt";
import { where } from 'sequelize';



const { User, Role, Skill } = db;

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
            const user = await User.findOne({
                where: { email },
                include: [{ model: Role, as: 'role', attributes: ['name'] }]
            }
            );
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

            console.log(" Password updated successfully");
            return true;
        } catch (error) {
            throw new DatabaseError('Failed to get user by email: ' + error.message);
        }
    }

    async getMyProfile(userData) {
        try {
            const { email } = userData;

            const user = await User.findOne({
                where: { email },
                attributes: { exclude: ['password'] },
                include: [
                    {
                        model: Skill,
                        as: 'skills',
                        through: {
                            attributes: []
                        }
                    },
                    {
                        model: Role,
                        as: 'role',
                        attributes: ['name']

                    }
                ]
            });
            console.log(user.skills)

            if (!user) {
                throw new DatabaseError('Failed to get user' + error.message);
            }
            console.log("User With Skill", user);
            return user;

        } catch (error) {
            console.error('[getMyProfile]', error);
            if (error instanceof DatabaseError) {
                throw error;
            }
            throw new DatabaseError(
                'Failed to fetch user profile',
                error
            );

        }

    }

    async getUserById(id) {
        try {
            const user = await User.findByPk(id, {
                include: [
                    {
                        model: Skill,
                        as: 'skills',
                        through: {
                            attributes: []
                        }
                    },
                    {
                        model: Role,
                        as: 'role',
                        attributes: ['name']

                    }
                ]
            });

            if (!user) {
                throw new DatabaseError('Failed to get user' + error.message);
            }

            return user;

        } catch (error) {
            console.error('[getUserById]', error);
            if (error instanceof DatabaseError) {
                throw error;
            }
            throw new DatabaseError(
                'Failed to fetch user profile',
                error
            );
        }
    }

    async updateUser(updateData, email) {
        try {

            if (!email) {
                throw new DatabaseError('email is required');
            }


            if (Object.keys(updateData).length === 0) {
                throw new DatabaseError('No data provided to update');
            }

            const [affectedRows] = await User.update(updateData, {
                where: {
                    email: email
                }
            });

            if (affectedRows.length == 0) {
                throw new DatabaseError('User not found or no changes made');
            }

            const updateUser = await User.findOne({
                where: { email },
                attributes: { exclude: ['password'] },
                include: {
                    model: Skill,
                    as: 'skills',
                    through: {
                        attributes: []
                    }
                }
            });

            return updateUser;


        } catch (error) {
            console.error('[updateuser]', error);
            if (error instanceof DatabaseError) {
                throw error;
            }
            throw new DatabaseError(
                'Failed to update user profile',
                error
            );
        }
    }
}

export default userRepository;