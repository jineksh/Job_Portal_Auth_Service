import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Role extends Model {
    static associate(models) {
      // One Role has many Users
      Role.hasMany(models.User, { 
        foreignKey: 'roleId',
        as: 'users' 
      });
    }
  }

  Role.init({
    name: {
      // ENUM constraint: Sirf yahi 3 values allow honge
      type: DataTypes.ENUM('job_seeker', 'employer'), 
      allowNull: false,
      unique: {
        msg: "Role name must be unique" // Duplicate role nahi banega
      },
      validate: {
        notEmpty: true, // Khali string allow nahi hogi
        isIn: {
          args: [['job_seeker', 'employer']],
          msg: "Role must be either admin, employer, or candidate"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles', // Database mein table ka naam 'roles' hoga
    timestamps: true    // createdAt aur updatedAt automatically handle honge
  });

  return Role;
};