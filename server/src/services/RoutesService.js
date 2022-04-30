const Route = require('../models/Route');
const Graph = require('node-dijkstra')
const helpers = require('../helpers');

const getAllById = async (graphId) => {
  const graphRoutes = await Route.findAll({
    where: { id: graphId },
    attributes: ['source', 'target', 'distance']
  })

  if(graphRoutes.length === 0) return null;

  return {
    id: graphId,
    data: [...graphRoutes],
  };
}

const getShortestPath = async (graphId, town1, town2) => {
  const graphRoutes = await Route.findAll({
    where: { id: graphId },
    attributes: ['source', 'target', 'distance']
  });

  if(graphRoutes.length === 0) return null;
  
  const graphObject = helpers.nodesObject(graphRoutes);
  const path = new Graph(graphObject);
  const shortestPath = path.path(town1, town2, { cost: true });
  const pathRenamed = helpers.changeNameOfKey(shortestPath, 'cost', 'distance')
  return pathRenamed;
}

module.exports = {
  getAllById,
  getShortestPath,
}