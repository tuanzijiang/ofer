const toolHandler = require(__config.TOOL_HANDLER_PATH);

// 获取函数映射
const allToolsMap = toolHandler.getAllToolsMap(__config.TOOL_PATHS);

// 获取导出的函数
const outputFns = toolHandler.getAllToolFns(allToolsMap);

module.exports = outputFns
