import * as fs from 'fs';
import { HandleCurrFile, ShouldBeStop } from './schema';

export const DFSFile = (path: string, handleCurrFile: HandleCurrFile, shouldBeStop: ShouldBeStop) => {
  // 判断是否结束
  if (shouldBeStop(path)) {
    return;
  }

  // 处理当前状态
  handleCurrFile(path);

  // 遍历子目录
  const nextPaths = fs.readdirSync(path);
  nextPaths.forEach(nextPath => {
    DFSFile(nextPath, handleCurrFile, shouldBeStop);
  });
}