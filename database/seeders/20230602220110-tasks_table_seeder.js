'use strict';
const { faker } = require('@faker-js/faker');
const { Users, Priorities, Categories } = require('../../models');
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
    // Insert faker tasks
    for (let i = 0; i < 30; i++) {
      const pastDate = faker.date.past();
      const soonDate = faker.date.soon();
      // Get random user
      const rndUser = await Users.findOne({
        order: Sequelize.literal('random()'),
        limit: 1
      });

      // Get random priority
      const rndPrior = await Priorities.findOne({
        where: { user_id: rndUser.id },
        order: Sequelize.literal('random()'),
        limit: 1
      });
      // Get random categorie
      const rndCat = await Categories.findOne({
        where: { user_id: rndUser.id },
        order: Sequelize.literal('random()'),
        limit: 1
      });
      // Insert fake data into tasks
      await queryInterface.bulkInsert('Tasks', [{
        title: faker.lorem.sentence(),
        description: faker.lorem.sentence(),
        completed_date: (randomBetween(0, 2))
          ? faker.date.between({
            from: pastDate,
            to: soonDate
          })
          : null,
        end_date: faker.date.between({
          from: pastDate,
          to: soonDate
        }),
        user_id: rndUser.id,
        priority_id: rndPrior.id,
        category_id: rndCat.id
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
    // Drop all data from tasks
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
