const RouteService = require('../services/RoutesService');

const getAllById = async (req, res) => {
  const { graphId } = req.params;
  const graphRoutes = await RouteService.getAllById(graphId);

  if (!graphRoutes) return res.status(404).json({ error: 'NOT FOUND (404)' })
  return res.status(200).json(graphRoutes);
}

module.exports = {
  getAllById
}