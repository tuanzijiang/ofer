import * as fs from 'fs';
import * as path from 'path';
import { HandleCurrFile, ShouldBeStop } from './schema';

export const DFSFile = (currPath: string, handleCurrFile: HandleCurrFile, shouldBeStop: ShouldBeStop) => {
  currPath = path.resolve(currPath);

  // 判断是否结束
  if (shouldBeStop(currPath)) {
    return;
  }

  // 处理当前状态
  handleCurrFile(currPath);

  // 遍历子目录
  const nextPaths = fs.readdirSync(currPath).map(subPath => (
    path.resolve(currPath, subPath)
  ));

  nextPaths.forEach(nextPath => {
    DFSFile(nextPath, handleCurrFile.bind(this), shouldBeStop);
  });
}