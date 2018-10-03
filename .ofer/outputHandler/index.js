const path = require('path');
const fs = require('fs');
const { DATA_TYPE_ENUM } = require(path.resolve(__rootname, '.ofer/ENUM.json'));

const getAllOutputStr = ({
  IOConfig,
  outputFnsMap,
  usedTools,
  answerStr,
}) => {
  // 处理依赖项
  let result = usedTools.reduce((prev, curr) => (
`${prev}${outputFnsMap[curr] || ''}
`), '');

  // 处理答案项
  if (DATA_TYPE_ENUM.READ === IOConfig.type) {
    result = `
      ${result}
      (${answerStr})()
    `
  } else {
    const { params, fnName } = IOConfig;
    const paramsStr = (params || []).reduce((prev, curr, idx) =>
      idx ? curr : `${prev},${curr}`, '');
    result = `${result}
const ${fnName} = ${answerStr.replace('(...param)', `(${paramsStr})`)}
`;
  }
  return result;
}

const outputToFile = (outputStr, filePath) => {
  fs.writeFileSync(path.resolve(__rootname, filePath), outputStr);
}


module.exports = {
  getAllOutputStr,
  outputToFile
}
