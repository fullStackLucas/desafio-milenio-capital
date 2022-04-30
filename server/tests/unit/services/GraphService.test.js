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
        id: 2,
        data: [...dataMock],
      };
      const result = await GraphService.create(dataMock);

      expect(result).to.be.deep.equal(expectedResult);
    })
  })
})