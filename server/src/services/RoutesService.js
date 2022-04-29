const Route = require('../models/Route');

const getAllById = (id) => {
  const graphRoutes = Route.findAll({
    where: {id}
  })

  return graphRoutes;
}

module.exports = {
  getAllById,
}