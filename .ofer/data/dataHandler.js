// 根据Data类别创建Data
const generateData = ({ type, input }) => {
  let data = null;
  if (!input) {
    return data;
  }
  const dataType = DATA_TYPE_ENUM[type];
  if (!dataType) {
    throw new Error(`不存在的dataType`);
  }

  const generateFn = __config.DATA_TYPE_ENUM_ENTITIES[dataType].handleDataInput;

  // 判断能否获取到生成函数
  if (Object.prototype.toString.call(generateFn) !== '[object Function]') {
    console.error(`不存在'${dataType}'的处理函数`);
    return data;
  }
  data = generateFn(input);
  return data;
}

const outputCMD = ({ type, output }) => {
  const dataType = DATA_TYPE_ENUM[type];
  const outputCMDFn = __config.DATA_TYPE_ENUM_ENTITIES[dataType].handleResultOutput;
  outputCMDFn(output);
}

module.exports = {
  generateData,
  outputCMD
}
