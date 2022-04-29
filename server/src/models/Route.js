const { DataTypes } = require('sequelize');
const db = require('.');

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

const Route = db.define(
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

module.exports = Route;
