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
    const logManager = this.ofer.getLogManager();
    logManager.info('getAllProjectDirs: start.', { rootPath });
    this.projectDirs = [];
    DFSFile(rootPath, this.handleProjectDir.bind(this), this.isFileNotExist)
    logManager.info('getAllProjectDirs: finish.', { projectDirs: this.projectDirs });
    return this.projectDirs;
  }

  private handleProjectDir(currPath: string) {
    const answerPath = path.join(currPath, 'answer.js');
    const dataPath = path.join(currPath, 'data.txt');
    if (fs.existsSync(answerPath) && fs.existsSync(dataPath)) {
      this.projectDirs = this.projectDirs.concat(currPath);
    }
  }

  private isFileNotExist(currPath: string) {
    return fs.existsSync(currPath) && !fs.statSync(currPath).isDirectory();
  }
}