const GraphService = require('../services/GraphsService');

const create = async (req, res) => {
  try {
    console.log('este é o console: ', req.body);
    const { data } = req.body;
    const createdGraph = await GraphService.create(data);
    return res.status(201).json(createdGraph);
  } catch (error) {
    console.log(error.message);
    return res.status(404).json(error.message);
  }
}


module.exports = { create };