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

const getShortestPath = async (req, res, next) => {
  try {
    const { graphId, town1, town2 } = req.params;
    const shortestPath = await RouteService.getShortestPath(
      graphId,
      town1.toUpperCase(),
      town2.toUpperCase()
    );

    if(!shortestPath && shortestPath !== 0) return res.status(404).json({ error: 'NOT FOUND (404)' })
    return res.status(200).json(shortestPath);
  } catch (error) {
    next(error);
  }
}

const getAllPaths = async (req, res, next) => {
  try {
    const { graphId, town1, town2 } = req.params;
    const { maxStops } = req.query;
    const possiblePaths = await RouteService.getAllPaths(graphId, town1, town2, maxStops);
    if (!possiblePaths) return res.status(404).json({ error: 'NOT FOUND (404)' });
    return res.status(200).json(possiblePaths);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllById,
  getShortestPath,
  getAllPaths,
}