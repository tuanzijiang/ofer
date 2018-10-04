const path = require('path');
const fs = require('fs');
const { getConfig } = require('./config');

const init = (injectConfig) => {
  global.__config = getConfig(injectConfig);

  const {
    FILE_HANDLER_PATH,
    DATA_HANDLER_PATH,
    TOOL_HANDLER_PATH,
    OUTPUT_HANDLER_PATH
  } = __config;
  const fileHandler = require(FILE_HANDLER_PATH);
  const dataHandler = require(DATA_HANDLER_PATH);
  const toolHandler = require(TOOL_HANDLER_PATH);
  const outputHandler = require(OUTPUT_HANDLER_PATH);

  // 根据rootPath获取每一个含有answer.js和data.txt的文件路径
  const allFilePaths = fileHandler.getAllFilePaths(__config.CODE_PATH);

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
    console.info(`当前运行的答案路径：${fileAnswerPath}`);
    console.info(`如果不是您希望的路径，请进入你希望的'answer.js'中强制保存，系统会自动读取最近一次的保存代码作为运行代码
    `);
    global.__toolname = path.resolve(__config.TOOL_PATH);
    const { config: IOConfig, answer } = require(fileAnswerPath);
    global.__toolname = '';
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
    const result = answer.apply(this, param);

    dataHandler.outputCMD({
      ...IOConfig,
      output: result
    })

    // 获取使用的tool函数
    const usedTools = toolHandler.getUsedTools();

    // 获取导出的answer体
    const answerStr = answer.toString();

    // 获取函数映射
    const allToolsMap = toolHandler.getAllToolsMap(__config.TOOL_PATHS);

    // 获取输出的辅助元素
    const outputToolsMap = toolHandler.getAllOutputFns(allToolsMap);

    // 获取导出的函数
    const outputStr = outputHandler.getAllOutputStr({
      IOConfig,
      outputToolsMap,
      usedTools,
      answerStr,
    });

    // 输出到文件
    outputHandler.outputToFile(outputStr, __config.OUTPUT_PATH);
  } catch (e) {
    console.error(e);
  }
}

module.exports = init;