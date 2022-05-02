'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => queryInterface.bulkInsert('graphs',
    [{id: 1}], {}),
      
  down: async (queryInterface) => queryInterface.bulkDelete('graphs', null, {}),
};
