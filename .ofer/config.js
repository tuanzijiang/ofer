const path = require('path');
const fs = require('fs');



const dataTypeFiles = fs.readdirSync(path.resolve(__rootname, './.ofer/data/dataType'));
const dataObjs = dataTypeFiles.map(dataType => require(path.resolve(__rootname, `./.ofer/data/dataType/${dataType}`)));

const { DATA_TYPE_ENUM, DATA_TYPE_ENUM_ENTITIES } = dataObjs.reduce((prev, curr) => {
  return {
    DATA_TYPE_ENUM: {
      ...prev.DATA_TYPE_ENUM,
      [curr.name]: curr.name,
    },
    DATA_TYPE_ENUM_ENTITIES: {
      ...prev.DATA_TYPE_ENUM_ENTITIES,
      [curr.name]: curr,
    }
  };
}, {
    DATA_TYPE_ENUM: {},
    DATA_TYPE_ENUM_ENTITIES: {}
  });

const PATHS = {
  CODE_PATH: path.resolve(__rootname, './code'),
  TOOL_PATH: path.resolve(__rootname, './.ofer/tool.js'),
  FILE_HANDLER_PATH: path.resolve(__rootname, './.ofer/IO/fileHandler'),
  DATA_HANDLER_PATH: path.resolve(__rootname, './.ofer/data/dataHandler'),
  OUTPUT_HANDLER_PATH: path.resolve(__rootname, './.ofer/IO/outputHandler'),
  TOOL_HANDLER_PATH: path.resolve(__rootname, './.ofer/tool/toolHandler')
}

const platform = ['leetcode', 'nowcoder', 'acmcoder'];
const platformEntities = {
  leetcode: {
    'zh-CN': '领扣网',
    url: 'https://leetcode.com/',
    defaultType: 'DEFAULT',
    fnNameIsNeed: true
  },
  nowcoder: {
    'zh-CN': '牛客网',
    url: 'https://www.nowcoder.com',
    defaultType: 'READ',
    fnNameIsNeed: false
  },
  acmcoder: {
    'zh-CN': '赛码网',
    url: 'http://www.acmcoder.com/index',
    defaultType: 'READ',
    fnNameIsNeed: false
  }
}

const originConfig = {
  OUTPUT_PATH: './output.js',
  TOOL_PATHS: [
    '.ofer/toolHandler/tool.js'
  ],
  DATA_TYPE_ENUM,
  DATA_TYPE_ENUM_ENTITIES,
  platform,
  platformEntities,
  ...PATHS
}

const getConfig = (rootname) => {
  const injectConfig = fs.existsSync(path.resolve(rootname, './config.json')) ?
    require('../config') :
    {};
  return !injectConfig ? originConfig :
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
}

module.exports = {
  getConfig
};
