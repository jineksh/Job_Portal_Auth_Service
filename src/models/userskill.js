import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class UserSkill extends Model {}
  UserSkill.init({
    userId: { type: DataTypes.INTEGER, references: { model: 'User', key: 'id' } },
    skillId: { type: DataTypes.INTEGER, references: { model: 'Skill', key: 'id' } }
  }, { sequelize, modelName: 'UserSkill' });
  return UserSkill;
};