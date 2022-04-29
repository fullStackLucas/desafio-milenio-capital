const Graph = require('../models/Graph');
const Route = require('../models/Route');

const create = async (data) => {
  const createdGraph = await Graph.create();
  const bulkRouteInsertions = data.map((route) => ({
    graphId: createdGraph.id,
    source: route.source,
    target: route.target,
    distance: route.distance,
  }));
  const createdRoutes = await Route.bulkCreate([...bulkRouteInsertions])
  return {
    id: createdGraph.id,
    data,
  };
}

module.exports = {
  create
};