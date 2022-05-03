const { expect } = require("chai");
const sinon = require('sinon');

const { dataMock } = require('../../mocks');

const RouteController = require('../../../src/controllers/RouteController');
const RouteService = require('../../../src/services/RoutesService');

const ID = 2;
const INVALID_ID = 9;
const getAllResolved = {
  id: ID,
  data: [...dataMock]
}
const errorMessage = { error: 'NOT FOUND (404)' }
const shortestPathMock = { distance: 8, path: ['A', 'B', 'C'] };
const allRoutesMock = { 
  routes: [
    { route: 'ABC', stops: 2 },
    { route: 'AEBC', stops: 3 }
  ]
}

describe('RouteController', () => {
  describe('GET route /graph/:graphId Found', () => {
    const req = {
      params: {
        graphId: ID,
      },
    };

    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(RouteService, 'getAllById').resolves(getAllResolved)
    })

    afterEach(() =>{
      RouteService.getAllById.restore();
    })

    it('response status of GET /graph/:graphId should be 200', async () => {
      await RouteController.getAllById(req, res)

      expect(res.status.calledWith(200)).to.be.true;
    })

    it('response json should be an object with id and data', async () => {
      await RouteController.getAllById(req, res)

      expect(res.json.calledWith(getAllResolved)).to.be.true;
    })
  })

  describe('GET route /graph/:graphId Not Found', () => {
    const req = {
      params: {
        graphId: ID,
      },
    };

    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(RouteService, 'getAllById').resolves(null)
    })

    afterEach(() =>{
      RouteService.getAllById.restore();
    })

    it('response status of GET /graph/:graphId should be 404', async () => {
      await RouteController.getAllById(req, res)

      expect(res.status.calledWith(404)).to.be.true;
    })

    it('response json should be an error message', async () => {
      await RouteController.getAllById(req, res)

      expect(res.json.calledWith(errorMessage)).to.be.true;
    })
  })

  describe('POST route /distance/:graphId/from/:town1/to/:town2', () => {
    const req = {
      params: {
        graphId: ID,
        town1: 'A',
        town2: 'C',
      },
    };

    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(RouteService, 'getShortestPath').resolves(shortestPathMock)
    })

    afterEach(() =>{
      RouteService.getShortestPath.restore();
    })

    it('response status of route should be 200', async () => {
      await RouteController.getShortestPath(req, res)

      expect(res.status.calledWith(200)).to.be.true;
    })

    it('response json should be an object with distance and path', async () => {
      await RouteController.getShortestPath(req, res)

      expect(res.json.calledWith(shortestPathMock)).to.be.true;
    })
  })

  describe('POST route /distance/:graphId/from/:town1/to/:town2 with t1 and t2 being equal', () => {
    const req = {
      params: {
        graphId: ID,
        town1: 'A',
        town2: 'A',
      },
    };

    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(RouteService, 'getShortestPath').resolves(0)
    })

    afterEach(() =>{
      RouteService.getShortestPath.restore();
    })

    it('response status of route should be 200', async () => {
      await RouteController.getShortestPath(req, res)

      expect(res.status.calledWith(200)).to.be.true;
    })

    it('response json should be number zero', async () => {
      await RouteController.getShortestPath(req, res)

      expect(res.json.calledWith(0)).to.be.true;
    })
  })

  describe('POST route /distance/:graphId/from/:town1/to/:town2 when does not have path', () => {
    const req = {
      params: {
        graphId: ID,
        town1: 'X',
        town2: 'C',
      },
    };

    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(RouteService, 'getShortestPath').resolves(-1)
    })

    afterEach(() =>{
      RouteService.getShortestPath.restore();
    })

    it('response status of route should be 200', async () => {
      await RouteController.getShortestPath(req, res)

      expect(res.status.calledWith(200)).to.be.true;
    })

    it('response json should be an object with distance and path', async () => {
      await RouteController.getShortestPath(req, res)

      expect(res.json.calledWith(-1)).to.be.true;
    })
  })

  describe('POST route /distance/:graphId/from/:town1/to/:town2 Not Found', () => {
    const req = {
      params: {
        graphId: INVALID_ID,
        town1: 'A',
        town2: 'C',
      },
    };

    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(RouteService, 'getShortestPath').resolves(null)
    })

    afterEach(() =>{
      RouteService.getShortestPath.restore();
    })

    it('response status of route should be 404', async () => {
      await RouteController.getShortestPath(req, res)

      expect(res.status.calledWith(404)).to.be.true;
    })

    it('response json should be an object with distance and path', async () => {
      await RouteController.getShortestPath(req, res)

      expect(res.json.calledWith(errorMessage)).to.be.true;
    })
  })

  describe('POST /routes/1/from/A/to/C?maxStops=3', () => {
    const req = {
      params: {
        graphId: 1,
        town1: 'A',
        town2: 'C',
      },
      query: {
        maxStops: 3
      }
    };

    const res = {};
    const next = () => {}

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(RouteService, 'getAllPaths').resolves(allRoutesMock)
    })

    afterEach(() =>{
      RouteService.getAllPaths.restore();
    })

    it('response status of route should be 200', async () => {
      await RouteController.getAllPaths(req, res, next)

      expect(res.status.calledWith(200)).to.be.true;
    })

    it('response json should be an object with all routes', async () => {
      await RouteController.getAllPaths(req, res, next)

      expect(res.json.calledWith(allRoutesMock)).to.be.true;
    })
  })

  describe('POST /routes/999/from/A/to/C?maxStops=3 when id doesnt exists', () => {
    const req = {
      params: {
        graphId: 999,
        town1: 'A',
        town2: 'C',
      },
      query: {
        maxStops: 3
      }
    };

    const res = {};
    const next = () => {}

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(RouteService, 'getAllPaths').resolves(null)
    })

    afterEach(() =>{
      RouteService.getAllPaths.restore();
    })

    it('response status of route should be 404', async () => {
      await RouteController.getAllPaths(req, res, next)

      expect(res.status.calledWith(404)).to.be.true;
    })

    it('response json should be an object with all routes', async () => {
      await RouteController.getAllPaths(req, res, next)

      expect(res.json.calledWith(errorMessage)).to.be.true;
    })
  })

  describe('POST /routes/999/from/A/to/C?maxStops=3 when doesnt exists routes in this graph', () => {
    const req = {
      params: {
        graphId: 1,
        town1: 'A',
        town2: 'Z',
      },
      query: {
        maxStops: 3
      }
    };

    const res = {};
    const next = () => {}

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(RouteService, 'getAllPaths').resolves([])
    })

    afterEach(() =>{
      RouteService.getAllPaths.restore();
    })

    it('response status of route should be 200', async () => {
      await RouteController.getAllPaths(req, res, next)

      expect(res.status.calledWith(200)).to.be.true;
    })

    it('response json should be an object with all routes', async () => {
      await RouteController.getAllPaths(req, res, next)

      expect(res.json.calledWith([])).to.be.true;
    })
  })
})