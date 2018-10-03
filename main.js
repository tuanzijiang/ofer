const path = require('path');
const config = require('./config.json');

// 设置全局根路径
global.__rootname = __dirname;
global.__configname = path.resolve('./config.json');
global.__toolname = path.resolve(config.TOOL_OUT_PATH);


// 运行ofer主逻辑
require('./.ofer/index')();
