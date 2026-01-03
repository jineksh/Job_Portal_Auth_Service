import { DatabaseError } from "../errors/index.js";
import db from '../models/index.js';
const { Role } = db;

class userRoleRepository {


    async getRolebyName(roleName) {
        try {
            const role = await Role.findOne({ where: { name: roleName } });
            return role;
        } catch (error) {
            throw new DatabaseError('Failed to get role by name: ' + error.message);
        }
    }

    async getRolebyId(id) {
        try {
            const role = await Role.findByPk(id);
            return role;
        } catch (error) {
            throw new DatabaseError('Failed to get role by name: ' + error.message);
        }
    }



}

export default userRoleRepository;