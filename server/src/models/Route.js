const { DataTypes, Model } = require('sequelize');

const Attributes = {
  graphId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  source: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  target: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  distance: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
};

module.exports = (sequelize) => {
  const Route = sequelize.define(
    'route', 
    Attributes,
    {
      underscored: true,
      modelName: 'route',
      timestamps: false,
    },
  );

  Route.associate = (models) => {
    Route.belongsTo(models.Graph, {
      foreignKey: 'graphId', as: 'graphId',
    });
  };

  return Route;
};
