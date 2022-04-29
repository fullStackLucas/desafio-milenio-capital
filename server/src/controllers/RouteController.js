const RouteService = require('../services/RoutesService');

const getAllById = async (req, res) => {
  const { graphId } = req.params;
  const graphRoutes = await RouteService.getAllById(graphId);

  if (!graphRoutes) return res.status(404).json({ error: 'NOT FOUND (404)' })
  return res.status(200).json(graphRoutes);
}

const getShortestPath = async (req, res) => {
  const { graphId, town1, town2 } = req.params;
  const shortestPath = await RouteService(graphId, town1, town2);

  if(!shortestPath) return res.status(404).json({ error: 'NOT FOUND (404)' })
  return res.status(200).json(shortestPath);
}

module.exports = {
  getAllById,
  getShortestPath,
}