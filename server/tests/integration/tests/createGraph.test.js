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
      expect(response.body.data).to.have.length(11)
    });

    it('Should response with http status 200', async () => {
      const response = await chai.request('localhost:8080').get('/graph/1');
      expect(response).to.have.status(200);
    });
  });

  describe('Returns the new graph Creation', () => {
    beforeEach(() => {
      sinon.stub(Graph, 'create').callsFake(GraphMock.create);
      sinon.stub(Route, 'bulkCreate').callsFake(RouteMock.bulkCreate);
    });
  
    afterEach(() => {
      Graph.create.restore();
      Route.bulkCreate.restore();
    });
    it('Should have an array with length 7', async () => {
      const response = await chai.request('localhost:8080').post('/graph').send({
        data: [
          {source: 'A', target: 'D', distance: 3},
          {source: 'A', target: 'E', distance: 2},
          {source: 'B', target: 'E', distance: 5},
          {source: 'C', target: 'A', distance: 4},
          {source: 'C', target: 'B', distance: 3},
          {source: 'D', target: 'A', distance: 3},
          {source: 'E', target: 'C', distance: 3},
        ]
      });
      expect(response.body.data).to.have.length(7)
    });

    it('Should response with http status 201', async () => {
      const response = await chai.request('localhost:8080').post('/graph').send({
        data: [
          {source: 'A', target: 'D', distance: 3},
          {source: 'A', target: 'E', distance: 2},
          {source: 'B', target: 'E', distance: 5},
          {source: 'C', target: 'A', distance: 4},
          {source: 'C', target: 'B', distance: 3},
          {source: 'D', target: 'A', distance: 3},
          {source: 'E', target: 'C', distance: 3},
        ]
      });;
      expect(response).to.have.status(201);
    });
  });
});