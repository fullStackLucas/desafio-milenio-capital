const { changeNameOfKey, nodesObject } = require('../../../src/helpers');
const { expect } = require('chai');
const { dataMock } = require('../../mocks')
const objectReturned = {
  A: { B: 6, E: 4 },
  B: { A: 6, C: 2, D: 4 },
  C: { B: 3, D: 1, E: 7 },
  D: { B: 8 },
  E: { B: 5, D: 7 }
}

const shortestPath = {
  cost: 8, path: ['A', 'B', 'C']
}

const renamadeObject = {
  distance: 8, path: ['A', 'B', 'C']
}

describe('nodesObject tests', () => {
  it('Given an array of objects with nodes, returns an object with nodes', () => {
    const result = nodesObject(dataMock);
    expect(result).to.be.deep.equal(objectReturned);
  })
})

describe('changeNameOfKey tests', () => {
  it('Receives an object with cost and path and returns keys distance and path', () => {
    const result = changeNameOfKey(shortestPath);
    expect(result).to.be.deep.equal(renamadeObject)
  })
})