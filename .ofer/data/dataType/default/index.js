module.exports = {
  name: 'DEFAULT',
  description: '将data按行进行分割，并通过readline或者read_line进行读入',
  handleDataInput: input => input.split('\n').map(v => v.replace(/"/g, '')),
  handleResultOutput: output => {
    console.log(`输出的结果为：${output}`);
  },
  fnNameIsRequired: false
}