const { expect } = require("chai");
const sinon = require('sinon');

const { dataMock } = require('../../mocks');

const RouteModel = require('../../../src/models/Route');
const RouteService = require('../../../src/services/RoutesService');

const ID = 2;
const INEXISTENT_ID = 9;

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

  describe('POST /distance/<graphId>/from/<town1>/to/<town2> ')
})