import db from '../models/index.js';
import { DatabaseError } from '../errors/index.js';

const { User, Role } = db;

class userRepository {

    async createUser(data){
        try{
            const user = await User.create(data);
            return user;
        }
        catch(error){
            throw new DatabaseError('Failed to create user: '+ error.message);
        }
    }
}

export default  userRepository;