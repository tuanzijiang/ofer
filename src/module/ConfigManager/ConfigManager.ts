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
    this.oferConfig = config;
  }

  public getOferConfig() {
    return this.oferConfig;
  }
}
