const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
// const server = require('../../../src/server') não consegui fazer ele rodar sem o backend estar no ar.
const Graph = require('../../../src/models/Graph');
const Route = require('../../../src/models/Route');
const { Graph: GraphMock, Route: RouteMock } = require('../ModelsMocks')

chai.use(chaiHttp);

const { expect } = chai;

describe('Routes integrations tests', () => {
  describe('Returns the graphs that have the given graphId', () => {
    beforeEach(() => {
      sinon.stub(Route, 'findAll').callsFake(RouteMock.findAll);
    });
  
    afterEach(() => {
      Route.findAll.restore();
    });
    it('Should have an array with length 11', async () => {
      const response = await chai.request('localhost:8080').get('/graph/1');
      console.log('Aqui está o console do response: ', response.body.data)
      expect(response.body.data).to.have.length(11)
    });

    it('Should response with http status 200', async () => {
      const response = await chai.request('localhost:8080').get('/graph/1');
      expect(response).to.have.status(200);
    });
  });
});