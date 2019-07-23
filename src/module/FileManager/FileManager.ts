import * as fs from 'fs';
import * as path from 'path';
import { DFSFile } from '../../utils';
import { Ofer } from '../../Ofer';

export class FileManager {
  private projectDirs: string[] = [];
  private ofer: Ofer;

  constructor(ofer: Ofer) {
    this.ofer = ofer;
  }

  public getAllProjectDirs(rootPath) {
    DFSFile(rootPath, this.handleProjectDir, this.isFileNotExist)
  }

  private handleProjectDir(currPath: string) {
    const answerPath = path.join(currPath, 'answer.js');
    const dataPath = path.join(currPath, 'data.js');
    if (fs.existsSync(answerPath) && fs.existsSync(dataPath)) {
      this.projectDirs = this.projectDirs.concat(currPath);
    }
  }

  private isFileNotExist(currPath: string) {
    return !fs.statSync(currPath).isDirectory();
  }
}