const { expect } = require("chai");
const sinon = require('sinon');

const { dataMock } = require('../../mocks');

const RouteModel = require('../../../src/models/Route');
const RouteService = require('../../../src/services/RoutesService');

const ID = 2;
const INEXISTENT_ID = 9;
const INEXISTENT_TOWN = 'X';
const TOWN1 = 'A';
const TOWN2 = 'C';
const DISTANCE = 8;
const PATH_MOCK = ['A', 'B', 'C'];

describe('RouteService', () => {
  describe('GET /graph/:graphId endpoint getAllById functionality when id exists', () => {
    beforeEach(() => {
      const routeMockResolved = dataMock;
      sinon.stub(RouteModel, 'findAll').resolves(routeMockResolved);
    })

    afterEach(() => {
      RouteModel.findAll.restore();
    })

    it('Return sould be an object', async () => {
      const result = await RouteService.getAllById(ID);

      expect(result).to.be.an('object');
    })
    
    it('Return should be an object with properties id and data', async () => {
      const result = await RouteService.getAllById(ID);
      
      expect(result).to.includes.all.keys('id', 'data');
    })

    it('Return sould be an object with id: 2 and data: [...dataMock]', async () => {
      const expectedResult = {
        id: ID,
        data: [...dataMock],
      };
      const result = await RouteService.getAllById(ID);

      expect(result).to.be.deep.equal(expectedResult);
    })
  })

  describe('GET /graph/:graphId endpoint getAllById functionality when id does not exists', () => {
    beforeEach(() => {
      const routeMockResolved = [];
      sinon.stub(RouteModel, 'findAll').resolves(routeMockResolved);
    })

    afterEach(() => {
      RouteModel.findAll.restore();
    })

    it('Return sould be false', async () => {
      const result = await RouteService.getAllById(INEXISTENT_ID);

      expect(result).to.be.null;
    })
  })

  describe('POST /distance/<graphId>/from/<town1>/to/<town2> when id and graph exists', () => {
    beforeEach(() => {
      const routeMockResolved = dataMock;
      sinon.stub(RouteModel, 'findAll').resolves(routeMockResolved);
    })

    afterEach(() => {
      RouteModel.findAll.restore();
    })

    it('Return of getShortestPath sould be an object', async () => {
      const result = await RouteService.getShortestPath(ID, TOWN1, TOWN2);

      expect(result).to.be.an('object');
    })

    it('Return of getShortestPath should be an object with properties distance and path', async () => {
      const result = await RouteService.getShortestPath(ID, TOWN1, TOWN2);
      
      expect(result).to.includes.all.keys('distance', 'path');
    })

    it('Return of getShortestPath sould be an object with distance: 8 and path: ["A", "B", "C"]', async () => {
      const expectedResult = {
        distance: DISTANCE,
        path: PATH_MOCK,
      };
      const result = await RouteService.getShortestPath(ID, TOWN1, TOWN2);

      expect(result).to.be.deep.equal(expectedResult);
    })
  })

  describe('POST /distance/<graphId>/from/<town1>/to/<town2> when id exists but graph does not', () => {
    beforeEach(() => {
      const routeMockResolved = dataMock;
      sinon.stub(RouteModel, 'findAll').resolves(routeMockResolved);
    })

    afterEach(() => {
      RouteModel.findAll.restore();
    })

    it('Return of getShortestPath sould be -1', async () => {
      const result = await RouteService.getShortestPath(ID, INEXISTENT_TOWN, TOWN2);

      expect(result).to.be.equal(-1);
    })
  })

  describe('POST /distance/<graphId>/from/<town1>/to/<town2> when id exists but town1 and town2 are equal', () => {
    beforeEach(() => {
      const routeMockResolved = dataMock;
      sinon.stub(RouteModel, 'findAll').resolves(routeMockResolved);
    })

    afterEach(() => {
      RouteModel.findAll.restore();
    })

    it('Return of getShortestPath sould be zero', async () => {
      const result = await RouteService.getShortestPath(ID, TOWN2, TOWN2);

      expect(result).to.be.equal(0);
    })
  })

  describe('POST /distance/<graphId>/from/<town1>/to/<town2> when id does not exists', () => {
    beforeEach(() => {
      const routeMockResolved = [];
      sinon.stub(RouteModel, 'findAll').resolves(routeMockResolved);
    })

    afterEach(() => {
      RouteModel.findAll.restore();
    })

    it('Return of getShortestPath sould be null', async () => {
      const result = await RouteService.getShortestPath(INEXISTENT_ID, TOWN1, TOWN2);

      expect(result).to.be.null;
    })
  })

  describe('POST /routes/<graphId>/from/<town1>/to/<town2>?maxStops=<maxStops> Not Found', () => {
    beforeEach(() => {
      const routeMockResolved = [];
      sinon.stub(RouteModel, 'findAll').resolves(routeMockResolved);
    })

    afterEach(() => {
      RouteModel.findAll.restore();
    })

    it('Return of getShortestPath sould be null', async () => {
      const result = await RouteService.getShortestPath(INEXISTENT_ID, TOWN1, TOWN2);

      expect(result).to.be.null;
    })
  })
})