const { DataTypes, Model } = require('sequelize');
const Graph = require('./graph');
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

class Route extends Model {};

Route.init(
  Attributes,
  {
    underscored: true,
    sequelize: db,
    modelName: 'route',
    timestamps: false,
  },
);

Route.belongsTo(Graph);

module.exports = Route;