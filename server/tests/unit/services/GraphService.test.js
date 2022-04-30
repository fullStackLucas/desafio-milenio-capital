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
      const expectedResult = {
        id: 2,
        data: [...dataMock],
      };
      const graphMockResolved = createGraphMock();
      const routeMockResolved = bulkCreateRouteMock();
      sinon.stub(GraphModel, 'create').resolves(graphMockResolved);
      sinon.stub(RouteModel, 'bulkCreate').resolves(routeMockResolved);
    })

    afterEach(() => {
      GraphModel.create.restore();
      RouteModel.bulkCreate.restore();
    })
  })
})