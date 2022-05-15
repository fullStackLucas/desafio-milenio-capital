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
/**
 * 
 * @param {{begin: {finish: number}}} graphObject has the graphObject where shows to where the sources connects.
 * @param {string} begin 
 * @param {string} finish 
 * @returns boolean
 */
const sourceHasConnectionWithTarget = (graphObject, begin, finish) => graphObject[begin].hasOwnProperty(finish);

/**
 * 
 * @param {{source: {target: number}}} object 
 * @param {string} source 
 * @param {string} target 
 * @returns string[]
 */
const iterateObject = (object, source, target) => {
  const lastPosition = source[source.length - 1];
  const areWeThere = sourceHasConnectionWithTarget(object, source, target);
  const newPaths = Object.keys(object[lastPosition]).map((pitStop) => {
    return source + pitStop;
  });

  return areWeThere ? [source + target] : [...newPaths];
}

/**
 * 
 * @param {{key: {key: string}}} object 
 * @param {number} key 
 * @returns boolean
 */
const checkIfKeysExistsInGraph = (object, key) => {
  const upperCasedKey = key.toUpperCase();
  const validation = object.hasOwnProperty(upperCasedKey);
  return validation; 
}

/**
 * 
 * @param {object} obj 
 * @param {string | string[]} arr 
 * @param {string} target 
 * @param {undefined | string[]} oldPath 
 * @returns string[]
 */
 function iterateObsectsArray (graphObject, source, target, oldPath) {
  if (typeof source === 'string') {
    const isSourceValid = checkIfKeysExistsInGraph(graphObject, source);
    const isTargetValid = checkIfKeysExistsInGraph(graphObject, target);
    if (!isSourceValid || !isTargetValid) return [];
  }
  let pathsWithoutTarget = [];
  let paths = [];
  let sourceToArray = [...source]
  if (oldPath) {
    paths = [...paths, ...oldPath]
  }

  sourceToArray.forEach((pathVariation) => {
    pathsWithoutTarget = [...pathsWithoutTarget, ...iterateObject(graphObject, pathVariation, target)];
  })
  paths = [...paths, ...pathsWithoutTarget.filter((path) => path.includes(target))];
  pathsWithoutTarget = pathsWithoutTarget
    .filter((path) => !path.includes(target));

  const lastPathWithoutTarget = pathsWithoutTarget[0]
    && pathsWithoutTarget[pathsWithoutTarget.length - 1];
    
  const lastString = lastPathWithoutTarget
    && lastPathWithoutTarget[lastPathWithoutTarget.length - 1];
    
  const originalSource = sourceToArray[0][0];
  const isResultEmpty = pathsWithoutTarget.length === 0;
    
  if (isResultEmpty || lastString === originalSource) {
    return paths;
  } else {
    pathsWithoutTarget = [...iterateObsectsArray(graphObject, pathsWithoutTarget, target, paths)];
  }
  return pathsWithoutTarget;
}

/**
 * 
 * @param {{source: string, target: string, distance: number}[]} data 
 * @param {string} init 
 * @param {string} end 
 * @param {number} maxStops 
 * @returns []
 */
const allRoutes = (data, init, end, maxStops) => {
  const routesObject = nodesObject(data);
  let pathObj = { route: '',  stops: 0 };
  const path = [];
  for (let key in routesObject[init]) {
    pathObj.route = init + key;
    pathObj.stops += 1;
    if (key === end) {
      path.push(pathObj);
      pathObj = { route: '',  stops: 0 };
    } else {
      for (let key1 in routesObject[key]) {
        if (routesObject[key].hasOwnProperty(end)) {
          pathObj.route += end;
          pathObj.stops += 1;
          path.push(pathObj);
          pathObj = { route: '',  stops: 0 };
        } else {
          pathObj.route += key1;
          pathObj.stops += 1;
          for (let key2 in routesObject[key1]) {
            if (routesObject[key1].hasOwnProperty(end)) {
              pathObj.route += end;
              pathObj.stops += 1;
              path.push(pathObj);
              pathObj = { route: '',  stops: 0 };
            } else {
              pathObj.route += key2;
              pathObj.stops += 1;
              for (let key3 in routesObject[key2]) {
                if (routesObject[key2].hasOwnProperty(end)) {
                  pathObj.route += end;
                  pathObj.stops += 1;
                  path.push(pathObj);
                  pathObj = { route: '',  stops: 0 };
                } else {
                  pathObj.route += key3;
                  pathObj.stops += 1;
                  for (let key4 in routesObject[key3]) {
                    if (routesObject[key3].hasOwnProperty(end)) {
                      pathObj.route += end;
                      pathObj.stops += 1;
                      path.push(pathObj);
                      pathObj = { route: '',  stops: 0 };
                    } else {
                      pathObj.route += key4;
                      pathObj.stops += 1;
                      for (let key5 in routesObject[key4]) {
                        if (routesObject[key4].hasOwnProperty(end)) {
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