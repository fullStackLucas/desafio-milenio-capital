'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const GraphsTable = queryInterface.createTable('graphs', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      }
    })
    
    return GraphsTable;
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('graphs');
  }
};
