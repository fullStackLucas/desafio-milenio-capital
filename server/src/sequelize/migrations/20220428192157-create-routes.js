'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const RoutesTable = queryInterface.createTable('routes', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'graphs',
          key: 'id',
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
