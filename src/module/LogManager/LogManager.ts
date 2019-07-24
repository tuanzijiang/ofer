import { Ofer } from "../../Ofer";
import { LogInstance } from './schema';

export class LogManager {
  private ofer: Ofer;
  private logInstance: LogInstance

  constructor(ofer: Ofer) {
    this.ofer = ofer;
    this.logInstance = console;
  }

  public setLogInstance(logInstance: LogInstance) {
    this.logInstance = logInstance;
  }

  public debug(...args) {
    this.logInstance.debug('[debug]', ...args);
  }

  public info(...args) {
    this.logInstance.info('[info]', ...args);
  }

  public warn(...args) {
    this.logInstance.warn('[warn]', ...args);
  }

  public error(...args) {
    this.logInstance.warn('[error]', ...args);
  }
}
