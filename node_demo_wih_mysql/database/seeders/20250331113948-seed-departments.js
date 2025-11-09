'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Departments', {}, { truncate: true });

    await queryInterface.bulkInsert('Departments', [
      {
        name: 'HR',
        description: 'This is HR departments',
        start_date: '2025-10-01',
        status: 'Active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Developer',
        description: 'This is HRdeveloper departments',
        start_date: '2025-11-01',
        status: 'Active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Testing',
        description: 'This is testing departments',
        start_date: '2025-12-01',
        status: 'Active',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Departments', null, {});
  },
};


//npx sequelize-cli db:seed:all --seeders-path ./database/seeders