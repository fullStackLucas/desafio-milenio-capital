const { DataTypes, Model } = require('sequelize');
const Route = require('./route');
const db = require('.');

const Attributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  }
};

class Graph extends Model {};

Graph.init(
  Attributes,
  {
    underscored: true,
    sequelize: db,
    modelName: 'graph',
    timestamps: false,
  },
);

Graph.hasMany(Route, { foreignKey: 'graphId', as: 'graphId' });

module.exports = Graph;