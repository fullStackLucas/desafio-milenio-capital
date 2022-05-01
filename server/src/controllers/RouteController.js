const RouteService = require('../services/RoutesService');

const getAllById = async (req, res, next) => {
  try {
    const { graphId } = req.params;
    const graphRoutes = await RouteService.getAllById(graphId);

    if (!graphRoutes) return res.status(404).json({ error: 'NOT FOUND (404)' })
    return res.status(200).json(graphRoutes);
  } catch (error) {
    next(error)
  }
}

const getShortestPath = async (req, res) => {
  try {
    const { graphId, town1, town2 } = req.params;
    const shortestPath = await RouteService.getShortestPath(
      graphId,
      town1.toUpperCase(),
      town2.toUpperCase()
    );

    if(!shortestPath) return res.status(404).json({ error: 'NOT FOUND (404)' })
    return res.status(200).json(shortestPath);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllById,
  getShortestPath,
}