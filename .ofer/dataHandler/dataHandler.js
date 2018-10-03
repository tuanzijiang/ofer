const { save, readline, read_line, print } = require('./platform');
const { DATA_TYPE_ENUM } = __config;

// 创建Data类别的函数映射
const generateDataFns = {
  [DATA_TYPE_ENUM.DEFAULT]: input => [input],
  [DATA_TYPE_ENUM.READ]: input => {
    save(input);
    global.readline = readline;
    global.print = print;
    global.read_line = read_line;
    return [];
  }
}

// 根据Data类别创建Data
const generateData = ({ type, input }) => {
  let data = null;
  if (!input) {
    return data;
  }
  const dataType = DATA_TYPE_ENUM[type];
  const generateFn = generateDataFns[dataType];

  // 判断能否获取到生成函数
  if (Object.prototype.toString.call(generateFn) !== '[object Function]') {
    console.error(`不存在'${dataType}'的处理函数`);
    return data;
  }
  data = generateFn(input);
  return data;
}

module.exports = {
  generateData
}
