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

const allRoutes = (data, init, end, maxStops) => {
  let pathObj = { route: '',  stops: 0 };
  const path = [];
  const objetoDasRotas = nodesObject(data);
  for (let key in objetoDasRotas[init]) {
    pathObj.route = init + key;
    pathObj.stops += 1;
    if (key === end) {
      path.push(pathObj);
      pathObj = { route: '',  stops: 0 };
    } else {
      for (let key1 in objetoDasRotas[key]) {
        if (objetoDasRotas[key].hasOwnProperty(end)) {
          pathObj.route += end;
          pathObj.stops += 1;
          path.push(pathObj);
          pathObj = { route: '',  stops: 0 };
        } else {
          pathObj.route += key1;
          pathObj.stops += 1;
          for (let key2 in objetoDasRotas[key1]) {
            if (objetoDasRotas[key1].hasOwnProperty(end)) {
              pathObj.route += end;
              pathObj.stops += 1;
              path.push(pathObj);
              pathObj = { route: '',  stops: 0 };
            } else {
              pathObj.route += key2;
              pathObj.stops += 1;
              for (let key3 in objetoDasRotas[key2]) {
                if (objetoDasRotas[key2].hasOwnProperty(end)) {
                  pathObj.route += end;
                  pathObj.stops += 1;
                  path.push(pathObj);
                  pathObj = { route: '',  stops: 0 };
                } else {
                  pathObj.route += key3;
                  pathObj.stops += 1;
                  for (let key4 in objetoDasRotas[key3]) {
                    if (objetoDasRotas[key3].hasOwnProperty(end)) {
                      pathObj.route += end;
                      pathObj.stops += 1;
                      path.push(pathObj);
                      pathObj = { route: '',  stops: 0 };
                    } else {
                      pathObj.route += key4;
                      pathObj.stops += 1;
                      for (let key5 in objetoDasRotas[key4]) {
                        if (objetoDasRotas[key4].hasOwnProperty(end)) {
                          pathObj.route += end;
                          pathObj.stops += 1;
                          path.push(pathObj);
                          pathObj = { route: '',  stops: 0 };
                        } else {
                          pathObj.route += end;
                          pathObj.stops += 1;
                          path.push(pathObj);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  } 
  return (!maxStops)
    ? path.filter((el) => el.route[0].includes(init))
    : path.filter((el) => el.stops <= maxStops && el.route[0].includes(init));
}

module.exports = {
  nodesObject,
  changeNameOfKey,
  allRoutes,
}