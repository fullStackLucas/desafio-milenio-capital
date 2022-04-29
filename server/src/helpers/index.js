const nodesObject = (data) => {
  const newObjectNode = {};

  data.forEach(({source, target, distance}) => {
    let insideObject = {}
    insideObject[target] = distance;
    if(!newObjectNode[source]) {
      newObjectNode[source] = insideObject;
      insideObject = {}
    } else {
      newObjectNode[source] = {
        ...newObjectNode[source],
        ...insideObject,
      }
      insideObject = {}
    }
  })
  return newObjectNode;
}

module.exports = {
  nodesObject,
}