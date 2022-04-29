const Route = require('../models/Route');
const Graph = require('node-dijkstra')
 
const shortestPath = new Graph()

const getAllById = async (graphId) => {
  console.log(graphId)
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

module.exports = {
  getAllById,
}