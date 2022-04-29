const GraphService = require('../services/GraphsService');

const create = async (_req, res) => {
  try {
    const createdGraph = await GraphService.create();
    return res.status(201).json(createdGraph);
  } catch (error) {
    console.log(error.message);
    return res.status(404).json(error.message);
  }
}


module.exports = { create };