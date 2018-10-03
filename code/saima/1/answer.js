const path = require('path');
const { B, C } = require(__toolname);
const { DATA_TYPE_ENUM } = require(path.resolve(__rootname, '.ofer/ENUM.json'));

const config = {
  type: DATA_TYPE_ENUM.DEFAULT,
  fnName: 'Leetcode',
  params: ['a', 'b', 'c']
}

const answer = (...param) => {
  B();
  C;
}

module.exports = {
  config,
  answer
}