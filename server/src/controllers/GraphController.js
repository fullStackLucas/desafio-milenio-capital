const GraphService = require('../services/GraphsService');

const create = async (req, res, next) => {
  try {
    const { data } = req.body;
    const createdGraph = await GraphService.create(data);
    return res.status(201).json(createdGraph);
  } catch (error) {
    next(error);
  }
}


module.exports = { create };