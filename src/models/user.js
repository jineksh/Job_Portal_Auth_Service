import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      // 1. Role association (Pehle se tha)
      User.belongsTo(models.Role, { 
        foreignKey: 'roleId', 
        as: 'role' 
      });

      // 2. SKILL Association (Naya Add Kiya)
      // 'through' mein wahi naam likhna jo tumne Join Table ka rakha hai
      User.belongsToMany(models.Skill, { 
        through: 'UserSkill', 
        foreignKey: 'userId',
        otherKey: 'skillId',
        as: 'skills'
      });
    }
  }

  User.init({
    name: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    email: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true,
      validate: { isEmail: true }
    },
    password: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    phoneNum: { 
      type: DataTypes.STRING,
      allowNull: true
    },
    profilePic: { type: DataTypes.STRING },
    profilePicPublicId: { type: DataTypes.STRING },
    resume: { type: DataTypes.STRING },
    resumePublicId: { type: DataTypes.STRING },
    bio: { type: DataTypes.TEXT },
    roleId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Roles',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true
  });

  return User;
};