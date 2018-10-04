const { _bigNumAdd, digitStr } = require(__toolname);
const { DATA_TYPE_ENUM } = __config;

const config = {
  type: DATA_TYPE_ENUM.READ,
}

const answer = () => {
  const digitMap = digitStr.split('').reduce((prev, curr) => {
    prev[curr] = true;
    return prev;
  }, {});
  let currLine= null;
  while(currLine = readline()) {
    const strs = currLine.split(' ');
    const arr1 = strs[0].split('');
    const arr2 = strs[1].split('');
    if (arr1.every(v => digitMap[v]) && arr2.every(v => digitMap[v])) {
      print(_bigNumAdd(arr1.join(''), arr2.join('')));
    } else {
      print('error');
    }
  }
}

module.exports = {
  config,
  answer
}