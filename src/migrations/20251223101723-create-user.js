'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true // Isse duplicate accounts nahi banenge
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phoneNum: {
        type: Sequelize.STRING
      },
      profilePic: {
        type: Sequelize.STRING
      },
      profilePicPublicId: {
        type: Sequelize.STRING
      },
      resume: {
        type: Sequelize.STRING
      },
      resumePublicId: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.TEXT
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles', // 'Roles' table ka naam yahan dena zaroori hai
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT' // User delete hone se pehle role check hoga
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};