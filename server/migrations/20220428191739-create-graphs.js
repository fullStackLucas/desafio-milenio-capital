'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const GraphsTable = queryInterface.createTable('Graphs', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      }
    })
    
    return GraphsTable;
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable('Graphs');
  }
};
