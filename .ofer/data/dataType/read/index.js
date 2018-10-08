const { save, readline, read_line, print, printAll } = require('./platform');

module.exports = {
  name: 'READ',
  description: '将data按行进行分割并按顺序作为参数传入answer函数中',
  handleDataInput: input => {
    save(input);
    global.readline = readline;
    global.print = print;
    global.read_line = read_line;
    return [];
  },
  handleResultOutput: () => {
    printAll();
  },
  fnNameIsRequired: false
}