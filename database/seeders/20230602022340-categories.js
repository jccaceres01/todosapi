'use strict';
const { faker } = require('@faker-js/faker');
const { Users } = require('../../models');
const { randomBetween } = require('../../utils/mathsHandlers');

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
    // Seed categories with fake data
    const users = await Users.findAll();
    for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < randomBetween(1, 11); j++) {
        await queryInterface.bulkInsert('Categories', [{
          name: faker.lorem.word(),
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
    // Drop all categories
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
