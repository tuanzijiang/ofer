const { save, readline, read_line, print, printAll } = require('./platform');

module.exports = {
  name: 'READ',
  description: '将data按行进行分割，并通过readline或者read_line进行读入(牛客网和赛码网)',
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