const path = require('path');

const PATHS = {
  CODE_PATH: path.resolve(__rootname, './code'),
  TOOL_PATH: path.resolve(__rootname, './.ofer/tool.js'),
  FILE_HANDLER_PATH: path.resolve(__rootname, './.ofer/fileHandler'),
  DATA_HANDLER_PATH: path.resolve(__rootname, './.ofer/dataHandler'),
  OUTPUT_HANDLER_PATH: path.resolve(__rootname, './.ofer/outputHandler'),
  TOOL_HANDLER_PATH: path.resolve(__rootname, './.ofer/toolHandler')
}

const originConfig = {
  OUTPUT_PATH: './output.js',
  TOOL_PATHS: [
    '.ofer/toolHandler/tool.js'
  ],
  DATA_TYPE_ENUM: {
    DEFAULT: 'DEFAULT',
    READ: 'READ',
    TREE: 'TREE'
  },
  ...PATHS
}

const getConfig = (injectConfig) => ( !injectConfig ? originConfig :
  Object.entries(injectConfig).reduce((prev, [configKey, configItem]) => {
    const injectConfigType = Object.prototype.toString.call(configItem);
    const originConfigType = Object.prototype.toString.call(prev[configKey]);
    if (injectConfigType !== originConfigType) {
      return prev;
    }
    switch (injectConfigType) {
      case '[object Array]': {
        prev[configKey] = prev[configKey].concat(
          configItem.filter(config =>
            !~prev[configKey].indexOf(config)
          )
        );
        break;
      };
      case '[object Object]': {
        prev[configKey] = {
          ...prev[configKey],
          ...configItem
        }
        break;
      }
      default: {
        prev[configKey] = configItem
        break;
      }
    }
    return prev;
  }, originConfig)
)

module.exports = { 
  getConfig
};
