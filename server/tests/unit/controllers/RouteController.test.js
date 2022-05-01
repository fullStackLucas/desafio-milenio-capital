const { expect } = require("chai");
const sinon = require('sinon');

const { dataMock } = require('../../mocks');

const RouteController = require('../../../src/controllers/RouteController');
const RouteService = require('../../../src/services/RoutesService');

const ID = 2;
const getAllResolved = {
  id: ID,
  data: [...dataMock]
}
const errorMessage = { error: 'NOT FOUND (404)' }

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
})