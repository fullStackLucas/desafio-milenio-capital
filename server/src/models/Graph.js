const { DataTypes } = require('sequelize');
const db = require('.');

const Attributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  }
};

const Graph = db.define(
  'graph', 
  Attributes,
  {
    underscored: true,
    modelName: 'graph',
    timestamps: false,
  },
);

Graph.associate = (models) => {
  Graph.hasMany(models.Route, {
    foreignKey: 'id', as: 'id',
  });
};

module.exports = Graph;

