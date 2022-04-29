const nodesObject = (data) => {
  const newObjectNode = {};

  data.forEach(({source, target, distance}) => {
    if(!newObjectNode[source]) {
      newObjectNode[source] = { [target]: distance };
    } else {
      newObjectNode[source] = {
        ...newObjectNode[source],
        [target]: distance,
      }
    }
  })
  return newObjectNode;
}

const changeNameOfKey = (obj, oldKeyName, newKeyName) => {
  return {
    [newKeyName]: obj[oldKeyName],
    path: [...obj.path],
  }
}

module.exports = {
  nodesObject,
  changeNameOfKey,
}