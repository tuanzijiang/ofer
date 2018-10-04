const { _bigNumAdd } = require(__toolname);
const { DATA_TYPE_ENUM } = __config;

const config = {
  type: DATA_TYPE_ENUM.DEFAULT,
  fnName: 'addStrings'
}

const answer = (num1, num2) => {
  return _bigNumAdd(num1, num2);
}

module.exports = {
  config,
  answer
}