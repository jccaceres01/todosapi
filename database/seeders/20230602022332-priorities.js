'use strict';
const { faker } = require('@faker-js/faker');
const { Users } = require('../../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    // Seed priorities
    const users = await Users.findAll();
    for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < 4; j++) {
        await queryInterface.bulkInsert('Priorities', [{
          name: `priority ${j + 1}`,
          description: faker.lorem.sentence(),
          user_id: users[i].id
        }], {});
      }
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    // Drop all priorities
    await queryInterface.bulkDelete('Priorities', null, {});
  }
};
