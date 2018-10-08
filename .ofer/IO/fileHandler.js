const fs = require('fs');
const path = require('path');

// DFS遍历rootPath获取同时含有answer.js和data.txt的文件路径
const getAllFilePaths = (rootPath) => {
  const currAnswerPath = path.join(rootPath, 'answer.js');
  const currDataPath = path.join(rootPath, 'data.txt');
  let allFilePaths = [];
  if (fs.existsSync(currAnswerPath) && fs.existsSync(currDataPath)) {
    allFilePaths = allFilePaths.concat(rootPath);
  }

  const currPaths = fs.readdirSync(rootPath);
  currPaths.forEach(currPath => {
    const nextPath = path.join(rootPath, currPath);
    if (fs.statSync(nextPath).isDirectory()) {
      allFilePaths = allFilePaths.concat(getAllFilePaths(nextPath));
    }
  });
  return allFilePaths;
}

// 遍历所有的文件路径，获取文件的状态，用于获取最新修改的文件夹路径
const getAllFileStates = (allFilePaths) => allFilePaths.map(filePath => ({
  fileAnswerPath: path.resolve(filePath, 'answer.js'),
  fileDataPath: path.resolve(filePath, 'data.txt'),
  fileMTime: Math.max(
    fs.statSync(path.resolve(filePath, 'answer.js')).mtimeMs,
    fs.statSync(path.resolve(filePath, 'data.txt')).mtimeMs
  )
}));


module.exports = {
  getAllFilePaths,
  getAllFileStates
}
