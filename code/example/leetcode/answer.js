const { _bigNumAdd } = require(__toolname);

const config = {
  type: DATA_TYPE_ENUM.DEFAULT,
  fnName: 'addStrings'
}

const answer = (num1, num2) => {
  // code ...
  return _bigNumAdd(num1, num2);
}

module.exports = {
  config,
  answer
}