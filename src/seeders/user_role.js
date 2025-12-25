import { Sequelize } from 'sequelize';

export default {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [
      {
        name: 'job_seeker',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'recruiter',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};