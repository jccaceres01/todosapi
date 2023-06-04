'use strict';
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

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
    // Gen a salt for encrypeted passwords
    const salt = await bcrypt.genSalt(10);

    // Test personal user
    queryInterface.bulkInsert('Users', [{
      name: 'Julio Caceres',
      email: 'jcesar01@hotmail.es',
      password: await bcrypt.hash('Password1', salt)
    }], {});

    // Create others users
    for (let i = 0; i < 10; i++) {
      queryInterface.bulkInsert('Users', [{
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: await bcrypt.hash('Password1', salt)
      }], {});
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    // Delete all users
    await queryInterface.bulkDelete('Users', null, {});
  }
};
