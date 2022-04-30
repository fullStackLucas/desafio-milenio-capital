const { expect } = require("chai");
const sinon = require('sinon');

const {
  dataMock,
  createGraphMock,
  bulkCreateRouteMock,
} = require('../../mocks');

const GraphModel = require('../../../src/models/Graph');
const RouteModel = require('../../../src/models/Route');
const GraphService = require('../../../src/services/GraphsService');
const RouteService = require('../../../src/services/RoutesService');

const ID = 2;
const INEXISTENT_ID = 9;


describe('GraphService', () => {
  describe('POST /graph endpoint create functionality', () => {
    beforeEach(() => {
      const graphMockResolved = createGraphMock();
      const routeMockResolved = bulkCreateRouteMock();
      sinon.stub(GraphModel, 'create').resolves(graphMockResolved);
      sinon.stub(RouteModel, 'bulkCreate').resolves(routeMockResolved);
    })

    afterEach(() => {
      GraphModel.create.restore();
      RouteModel.bulkCreate.restore();
    })

    it('Return sould be an object', async () => {
      const result = await GraphService.create(dataMock);

      expect(result).to.be.an('object');
    })
    
    it('Return should be an object with properties id and data', async () => {
      const result = await GraphService.create(dataMock);
      
      expect(result).to.includes.all.keys('id', 'data');
    })

    it('Return sould be an object with id: 2 and data: [...dataMock]', async () => {
      const expectedResult = {
        id: ID,
        data: [...dataMock],
      };
      const result = await GraphService.create(dataMock);

      expect(result).to.be.deep.equal(expectedResult);
    })
  })

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
})