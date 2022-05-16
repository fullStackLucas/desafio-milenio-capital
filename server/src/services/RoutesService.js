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
  if(town1 === town2) return 0;
  if(graphRoutes.length === 0) return null;
  
  const graphObject = helpers.nodesObject(graphRoutes);
  const path = new Graph(graphObject);
  const shortestPath = path.path(town1, town2, { cost: true });

  if (!shortestPath.path) return -1;
  const pathRenamed = helpers.changeNameOfKey(shortestPath, 'cost', 'distance')
  return pathRenamed;
}

const getAllPaths = async (graphId, town1, town2, maxStops) => {
  const graphRoutes = await Route.findAll({
    where: { id: graphId },
    attributes: ['source', 'target', 'distance']
  });

  if(graphRoutes.length === 0) return null;

  const possibleRoutes = helpers.allRoutes(graphRoutes, town1, town2);

  const routesWithStopsLimit = possibleRoutes.filter((route) => route.stops <= Number(maxStops));
  
  const objectToReturn = maxStops ? { routes: [...routesWithStopsLimit] } : { routes: [...possibleRoutes] };

  return (possibleRoutes.length > 0) ? objectToReturn : possibleRoutes;
}

module.exports = {
  getAllById,
  getShortestPath,
  getAllPaths,
}