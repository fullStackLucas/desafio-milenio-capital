const { expect } = require("chai");
const sinon = require('sinon');

const { dataMock } = require('../../mocks');

const GraphController = require('../../../src/controllers/GraphController');
const GraphService = require('../../../src/services/GraphsService');

const ID = 2;
const createResolved = {
  id: ID,
  data: [...dataMock]
}

describe('GraphController', () => {
  describe('GraphController.create()', () => {
    const req = {
      body: {
        data: [...dataMock],
      },
    };
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(GraphService, 'create').resolves(createResolved)
    })

    afterEach(() =>{
      GraphService.create.restore();
    })

    it('response status of POST /graph should be 201', async () => {
      await GraphController.create(req, res)

      expect(res.status.calledWith(201)).to.be.true;
    })
  })
})