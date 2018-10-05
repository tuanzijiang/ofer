const path = require('path');
const fs = require('fs');

const usedFns = [];
const usedStr = [];

const getAllToolsMap = (toolPaths) => toolPaths.reduce((prev, curr) => {
  const currToolPath = path.resolve(__rootname, curr);
  if (!fs.existsSync(currToolPath)) {
    return prev;
  }
  const currTool = require(currToolPath);
  const currToolText = fs.readFileSync(currToolPath, 'utf-8');

  if (Object.prototype.toString.call(currTool) !== '[object Object]') {
    return prev;
  }

  const currToolFns = Object.entries(currTool);
  const currToolOrder = Object.keys(currTool).sort((toolName1, toolName2) => (
    currToolText.indexOf(` ${toolName1} `) - currToolText.indexOf(` ${toolName2} `)
  ));

  return {
    entities: {
      ...prev.entities,
      ...currToolFns.reduce((prev, [toolName, tool]) => {
        prev[toolName] = {
          toolStr: tool.toString(),
          tool,
          toolType: Object.prototype.toString.call(tool),
          toolPath: currToolPath
        }
        return prev;
      }, {})
    },
    order: prev.order.concat(currToolOrder)
  }
}, {
  entities: {},
  order: []
});

const getAllToolFns = (toolsMap) => {
  const outputObj = {};
  const orderedEntities = toolsMap.order.map(toolName => [toolName, toolsMap.entities[toolName]]);
  const executableStr = orderedEntities.reduce((prev, [toolName, { toolStr, toolType }]) => {

    // TODO: 对数字和字符串做区分以及导入的顺序
    if (toolType === '[object Function]') {
      return `${prev}
      const ${toolName} = (...param) => {
        usedFns.push('${toolName}');
        return toolsMap.entities['${toolName}'].tool(...param);
      };
      outputObj['${toolName}'] = ${toolName};
      `
    } else if (toolType === '[object String]') {
      return `${prev}
      const ${toolName} = '${toolStr}';
      Object.defineProperty(outputObj, '${toolName}', {
        configurable: true,
        enumerable: true,
        set: function (fn) {
          return ${toolName};
        },
        get: function () {
          usedStr.push('${toolName}');
          return '${toolStr}';
        }
      }); 
      `
    } else {
      return `${prev}
      const ${toolName} = ${toolStr};
      Object.defineProperty(outputObj, '${toolName}', {
        configurable: true,
        enumerable: true,
        set: function (fn) {
          return ${toolName};
        },
        get: function () {
          usedStr.push('${toolName}');
          return ${toolStr};
        }
      }); 
      `
    }
  }, '');
  eval(executableStr);
  return outputObj;
};

const getAllOutputFns = (toolsMap) => Object.entries(toolsMap.entities).reduce(
  (prev, [toolName, { toolStr, toolType }]) => {
    prev[toolName] = toolType === '[object String]' ? `const ${toolName} = '${toolStr}'` : `const ${toolName} = ${toolStr}`;
    return prev;
  }, {}
);

const getUsedTools = () => usedStr.concat(usedFns.reverse());

module.exports = {
  getAllToolsMap,
  getAllOutputFns,
  getAllToolFns,
  getUsedTools
};
