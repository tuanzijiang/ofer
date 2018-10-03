const path = require('path');
const fs = require('fs');

const usedFns = [];
const usedStr = [];

const getAllFnsMap = (toolPaths) => toolPaths.reduce((prev, curr) => {
  const currToolPath = path.resolve(__rootname, curr);
  if (!fs.existsSync(currToolPath)) {
    return prev;
  }
  const currTool = require(currToolPath);
  if (Object.prototype.toString.call(currTool) !== '[object Object]') {
    return prev;
  }

  const currToolFns = Object.entries(currTool);

  return {
    ...prev,
    ...currToolFns.reduce((prev, [fnName, fn]) => {
      prev[fnName] = {
        fnStr: fn.toString(),
        fn
      }
      return prev;
    }, {})
  }
}, {});

const getAllToolFns = (fnsMap) => {
  const outputObj = {};
  const executableStr = Object.entries(fnsMap).reduce((prev, [fnName, fnObj]) => {
    const { fn, fnStr } = fnObj;
    if (Object.prototype.toString.call(fn) === '[object Function]') {
      return `${prev}
      const ${fnName} = (...param) => {
        usedFns.push('${fnName}');
        return (${fnStr})(...param);
      };
      outputObj['${fnName}'] = ${fnName};
      `
    } else {
      return `${prev}
      const ${fnName} = ${fnStr};
      Object.defineProperty(outputObj, '${fnName}', {
        configurable: true,
        enumerable: true,
        set: function (fn) {
          return ${fnName};
        },
        get: function () {
          usedStr.push('${fnName}');
          return ${fnName};
        }
      }); 
      `
    }
  }, '');
  eval(executableStr);
  return outputObj;
};

const getAllOutputFns = (fnsMap) => Object.entries(fnsMap).reduce(
  (prev, [fnName, { fnStr }]) => {
    prev[fnName] = `const ${fnName} = ${fnStr}`
    return prev;
  }, {}
);

const getUsedTools = () => usedStr.concat(usedFns.reverse());

module.exports = {
  getAllFnsMap,
  getAllOutputFns,
  getAllToolFns,
  getUsedTools
};
