const Graph = require('../models/Graph');

const create = async () =>  {
    const createdGraph = await Graph.create()
    return createdGraph;
}

module.exports = {
  create
};