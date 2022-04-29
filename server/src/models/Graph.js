const { DataTypes } = require('sequelize');

const Attributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  }
};

module.exports = (sequelize) => {
  const Graph = sequelize.define(
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
      foreignKey: 'graphId', as: 'graphId',
    });
  };

  return Graph;
};
