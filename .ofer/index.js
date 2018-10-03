const fs = require('fs');
const path = require('path');
const fileHandler = require('./fileHandler');
const dataHandler = require('./dataHandler');
const toolHandler = require('./toolHandler');
const outputHandler = require('./outputHandler');
const config = require(__configname);

const init = () => {
  // 根据rootPath获取每一个含有answer.js和data.txt的文件路径
  const allFilePaths = fileHandler.getAllFilePaths(config.CODE_ROOT);

  // 获取所有每个可用的题目的相关状态
  const allFileStates = fileHandler.getAllFileStates(allFilePaths);

  // 按照修改的时间排序,从大到小排序
  allFileStates.sort((a, b) => a.fileMTime > b.fileMTime ? -1 : 1);


  if (allFileStates.length === 0) {
    console.error('没有可运行的代码');
    return null
  }

  const { fileAnswerPath, fileDataPath } = allFileStates[0];
  try {
    const { config: IOConfig, answer } = require(fileAnswerPath);
    const data = fs.readFileSync(fileDataPath, 'utf-8');

    // 转化为入参
    const param = dataHandler.generateData({
      ...IOConfig,
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

    // 获取使用的tool函数
    const usedTools = toolHandler.getUsedTools();

    // 获取导出的answer体
    const answerStr = answer.toString();

    // 获取函数映射
    const allFnsMap = toolHandler.getAllFnsMap(config.TOOL_PATHS);

    // 获取输出的函数
    const outputFnsMap = toolHandler.getAllOutputFns(allFnsMap);

    // 获取导出的函数
    const outputStr = outputHandler.getAllOutputStr({
      IOConfig,
      outputFnsMap,
      usedTools,
      answerStr,
    });

    // 输出到文件
    outputHandler.outputToFile(outputStr, config.OUTPUT_FILE);
  } catch (e) {
    console.error(e);
  }
}

module.exports = init;