import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Skill extends Model {
    static associate(models) {
      // Many-to-Many connection
      Skill.belongsToMany(models.User, { 
        through: 'UserSkill', 
        foreignKey: 'skillId' 
      });
    }
  }
  Skill.init({
    name: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true 
    }
  }, {
    sequelize,
    modelName: 'Skill',
    tableName: 'skills'
  });
  return Skill;
};