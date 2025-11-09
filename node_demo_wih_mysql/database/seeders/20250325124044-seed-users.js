'use strict';
const { User } = require('../../app/models/user'); // Replace 'ModelName' with your actual model name
const bcrypt = require('bcrypt'); // Import bcrypt for hashing passwords
module.exports = {
  up: async (queryInterface, Sequelize) => {

    //delete all records before seeding
    await queryInterface.bulkDelete('Users', {}, { truncate: true });

    const hashedPassword1 = await bcrypt.hash('Aspl@123', 10);
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Ankita',
        email: 'ankita.modi@trreta.com',
        password: hashedPassword1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Misha',
        email: 'ankita.modi+1@example.com',
        password: hashedPassword1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};

//npx sequelize-cli db:seed:all --seeders-path ./database/seeders