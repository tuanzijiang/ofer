module.exports = {
  name: 'DEFAULT',
  description: '将data按行进行分割并按顺序作为参数传入answer函数中, (leetcode)',
  handleDataInput: input => input.split('\n').map(v => v.replace(/"/g, '')),
  handleResultOutput: output => {
    console.log(`输出的结果为：${output}`);
  },
  fnNameIsRequired: false
}