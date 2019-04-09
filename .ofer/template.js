const fs = require('fs');
const path = require('path');

const ANSWER_TEMPLATE_PATH = './templates/answer.template.txt';

const getTemplate = () => {
  const content = fs.readFileSync(path.resolve(__dirname, ANSWER_TEMPLATE_PATH)).toString();
  return content;
}

module.exports = getTemplate;