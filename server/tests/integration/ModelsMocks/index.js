const GraphDB = require('../integrationMocks/GraphDB.json');
const RouteDB = require('../integrationMocks/RouteDB.json');

const GraphMockCreate = (Instance, data) => {
  if(
    ![data].source
    || ![data].target
    || ![data].distance
  ){
    return;
  }
  let newId = 0;
  if(!Instance[0].id) {
    newId = 1;
    Instance.push({ id: newId });
  } else {
    newId = Instance[Instance.length - 1].id + 1;
    Instance.push({ id: newId });
  }

  data.forEach((route) => {
    const objectToPush = {
      id: newId,
      source: route.source,
      target: route.target,
      distance: route.distance,
    };
    RouteDB.push(objectToPush);
  });
  
  return {
    id: newId,
    data: [...data],
  };
};

const RouteMockFindAll = (id) => RouteDB.filter((route) => route.id === id);

const Graph = {
  create: async (data) => GraphMockCreate(GraphDB, data),
};

const Route = {
  findAll: async (id) => RouteMockFindAll(id),
}

module.exports = {
  Graph,
  Route,
};