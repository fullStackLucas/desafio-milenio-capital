'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const RoutesTable = queryInterface.createTable('routes', {
      graphId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'graph',
          key: 'id',
        },
      },
      source: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      target: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      distance: {
        allowNull: false,
        type: Sequelize.INTEGER,
      }
    })
    
    return RoutesTable;
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('routes');
  }
};
