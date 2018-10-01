const fs = require('fs');
const { DATA_TYPE_ENUM } = require('./lib/ENUM');
const { save, readline, read_line, print } = require('./lib/platform');

const DEBUG_ROOT = 'code';

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

const init = () => {

  // 根据rootPath获取每一个含有answer.js和data.txt的文件路径
  const getAllFilePaths = (rootPath) => {
    const currAnswerPath = `${rootPath}/answer.js`;
    const currDataPath = `${rootPath}/data.txt`;
    let allFilePaths = [];
    if (fs.existsSync(currAnswerPath) && fs.existsSync(currDataPath)) {
      allFilePaths = allFilePaths.concat(rootPath);
    }

    const currPaths = fs.readdirSync(rootPath);
    currPaths.forEach(currPath => {
      const nextPath = `${rootPath}/${currPath}`;
      if (fs.statSync(nextPath).isDirectory()) {
        allFilePaths = allFilePaths.concat(getAllFilePaths(nextPath));
      }
    });
    return allFilePaths;
  }
  const allFilePaths = getAllFilePaths(DEBUG_ROOT);

  // 获取所有每个可用的题目的相关状态
  const allFileStates = allFilePaths.map(filePath => ({
    fileAnswerPath: `${filePath}/answer.js`,
    fileDataPath: `${filePath}/data.txt`,
    fileMTime: Math.max(
      fs.statSync(`${filePath}/answer.js`).mtimeMs,
      fs.statSync(`${filePath}/data.txt`).mtimeMs
    )
  }));

  // 按照修改的时间排序,从大到小排序
  allFileStates.sort((a, b) => a.fileMTime > b.fileMTime ? -1 : 1);

  if(allFileStates.length === 0) {
    return null;
  }

  const { fileAnswerPath, fileDataPath } = allFileStates[0];
  const data = fs.readFileSync(fileDataPath, 'utf-8');
  try {
    const { dataConfig, answer } = require(fileAnswerPath);

    // 转化为入参
    const param = generateData({
      ...dataConfig,
      input: data
    });

    // 对导入的数据格式进行判断
    if (!param) {
      console.error(`'${fileDataPath}'的格式存在问题`)
      return null;
    }

    // 对导入的答案格式进行判断
    if (Object.prototype.toString.call(answer) !== '[object Function]') {
      console.error(`'${fileAnswerPath}'导出的对象不是一个function`);
      return null;
    }

    // 执行导入的参数
    answer.apply(this, param);
  } catch (e) {
    console.error(e);
  }
}

init();
