const config = require('./config.json');

// 设置全局根路径
global.__rootname = __dirname;

// 运行ofer主逻辑
require('./.ofer/index')(config);
