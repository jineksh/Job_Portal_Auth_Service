import db from '../models/index.js';
import { DatabaseError } from '../errors/index.js';

const { Skill } = db;

class skillRepository {


    async findORCreateSkill(skillNames) {
        // Find or create all skills in parallel
        try {
            const skillPromises = skillNames.map(name => Skill.findOrCreate({ where: { name } }));
            const skillResults = await Promise.all(skillPromises);

            const skillInstances = skillResults.map(([skill, created]) => skill);

            return skillInstances;
        } catch (error) {
            console.error('[findOrCreateSkill]', error);
            if (error instanceof DatabaseError) {
                throw error;
            }
            throw new DatabaseError(
                'Failed to fetch Skills',
                error
            );

        }
    }

}

export default skillRepository;