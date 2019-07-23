import { StateManager, FileManager, LogManager, ConfigManager } from './schema';

export class Ofer {
  private stateManager: StateManager;
  private fileManager: FileManager;
  private logManager: LogManager;
  private configManager: ConfigManager;

  constructor() {
    this.stateManager = new StateManager(this);
    this.fileManager = new FileManager(this);
    this.logManager = new LogManager(this);
    this.configManager = new ConfigManager(this);
  }

  run() {
    this.stateManager.config();

    this.stateManager.read();
  }

  public getStateManager() {
    return this.stateManager;
  }

  public getFileManager() {
    return this.fileManager;
  }

  public getLogManager() {
    return this.logManager;
  }

  public getConfigManager() {
    return this.configManager;
  }
}