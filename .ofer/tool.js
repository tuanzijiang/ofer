const config = require(__configname);
const toolHandler = require('./toolHandler');

// 获取函数映射
const allFnsMap = toolHandler.getAllFnsMap(config.TOOL_PATHS);

// 获取导出的函数
const outputFns = toolHandler.getAllToolFns(allFnsMap);

module.exports = outputFns
