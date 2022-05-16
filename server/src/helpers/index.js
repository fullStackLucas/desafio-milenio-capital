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

  if (source.length === 1) return [...newPaths];

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
  
  paths = [...paths, ...pathsWithoutTarget.filter((path) => (
    path.includes(target) && !path.slice(1, path.length).includes(path[0])
  ))];

  pathsWithoutTarget = pathsWithoutTarget
    .filter((path) => !path.includes(target));

  pathsWithoutTarget = pathsWithoutTarget.filter((path) => (
    !path.slice(1, path.length).includes(path[0]) && !path.slice(2, path.length).includes(path[1])
  ));

  const isResultEmpty = pathsWithoutTarget.length === 0;
    
  if (isResultEmpty) {
    return paths;
  } else {
    pathsWithoutTarget = [...iterateObsectsArray(graphObject, pathsWithoutTarget, target, paths)];
  }
  return pathsWithoutTarget;
}

/**
 * 
 * @param {string[]} routesArray 
 * @returns [{route: string, stops: number}]
 */
const mapPossibleRoutes = (routesArray) => {
  const routesWithStops = routesArray.map((route) => ({
    route,
    stops: route.length - 1,
  }));
  return routesWithStops;
}

/**
 * 
 * @param {{source: string, target: string, distance: number}[]} data 
 * @param {string} init 
 * @param {string} end 
 * @param {number} maxStops 
 * @returns []
 */
const allRoutes = (data, init, end) => {
  const routesObject = nodesObject(data);
  const routesArray = iterateObsectsArray(routesObject, init, end);
  const routesWithStops = mapPossibleRoutes(routesArray);
  return routesWithStops;
}

module.exports = {
  nodesObject,
  changeNameOfKey,
  allRoutes,
}