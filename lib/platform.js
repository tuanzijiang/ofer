let dataMap = [];
let currentLine = 0;
let currentPoi = 0;
let outputMap = [];
const MAXNUM = 1024;

// niuke
const save = (data, splitChar = '\n') => {
  dataMap = data.split(splitChar);
  currentLine = 0;
  console.warn(dataMap);
};

// const readline = () => dataMap[currentLine++];// 牛客网
const readline = () => { console.warn(dataMap);};

const read_line = () => {//赛码网
  let currentInput = dataMap[currentLine];
  let backLine = (currentInput || '').substr(currentPoi, MAXNUM);
  if ((currentInput || '').length >= currentPoi + MAXNUM) {
    currentPoi += MAXNUM;
  } else {
    currentPoi = 0;
    currentLine++;
  }
  return backLine;
};

const print = (data, consoleFlag) => {
  if (consoleFlag) {
    console.log(data);
  } else {
    outputMap.push(data)
  }
};

const printAll = () => {
  outputMap.forEach(v => console.log(`print: ${v}`));
};

// leetcode
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}
const toCharacter = (param, splitSymbol = ' ') => {
  const rows = param.split('\n').filter(v => v.length !== 0);
  return rows.map(v => v.split(splitSymbol).filter(v => v.length && v.length !== 0));
}
const toTree = (param) => {
  const createTree = (treeNode, idx) => {
    const leftVal = param[2 * idx + 1];
    const rightVal = param[2 * idx + 2];
    if (leftVal !== undefined) {
      const leftNode = new TreeNode(leftVal);
      treeNode.left = leftNode;
      createTree(leftNode, 2 * idx + 1);
    }
    if (rightVal !== undefined) {
      const rightNode = new TreeNode(rightVal);
      treeNode.right = rightNode;
      createTree(rightNode, 2 * idx + 2);
    }
  }
  if (param.length === 0) {
    return null;
  }
  const rootVal = param[0];
  const rootNode = new TreeNode(rootVal);
  createTree(rootNode, 0);
  return rootNode;
}


module.exports = {
  save,
  read_line,
  readline,
  print,
  printAll,
  toTree,
  toCharacter
}