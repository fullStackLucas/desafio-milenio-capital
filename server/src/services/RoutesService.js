const Route = require('../models/Route');

const getAllById = async (id) => {
  const graphRoutes = await Route.findAll({
    where: {id}
  })

  return graphRoutes;
}

module.exports = {
  getAllById,
}