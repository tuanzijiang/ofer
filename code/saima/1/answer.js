const { DATA_TYPE_ENUM } = require('../../../lib/ENUM.js');

const dataConfig = {
  type: DATA_TYPE_ENUM.READ,
}

const answer = (...param) => {
  console.warn(param);
}

module.exports = {
  dataConfig,
  answer
}