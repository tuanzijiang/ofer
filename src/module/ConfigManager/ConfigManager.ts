import { Ofer } from "../../Ofer";
import { OferConfig } from './schema';
import config from '../../default.config';

export class ConfigManager {
  private ofer: Ofer;
  private oferConfig: OferConfig;

  constructor(ofer: Ofer) {
    this.ofer = ofer;
  }

  public fetchAllConfig() {
    const logManager = this.ofer.getLogManager();
    this.oferConfig = config;
    logManager.debug('fetchAllConfig: finish.', JSON.stringify(config));
  }

  public getOferConfig() {
    return this.oferConfig;
  }
}
