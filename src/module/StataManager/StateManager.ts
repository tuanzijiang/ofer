import { StateMachine } from './index';
import { OferState, OferTranstionMap, OferTranstionName } from '../../schema';
import { Ofer } from '../../Ofer';

const transitions = [
  { from: OferState.INIT, to: OferState.READ_FILE, name: OferTranstionName.READ },
];

export class StateManager {
  private ofer: Ofer;
  private stateMachine: StateMachine<OferState, OferTranstionName, OferTranstionMap>;

  constructor(ofer: Ofer) {
    this.ofer = ofer;
    this.stateMachine = new StateMachine<OferState, OferTranstionName, OferTranstionMap>({
      transitions,
      init: OferState.INIT,
      methods: {
        [OferTranstionName.CONFIG]: this.transtionConfig,
        [OferTranstionName.READ]: this.transtionRead,
        [OferTranstionName.RESOLVE]: () => { },
        [OferTranstionName.EXEC]: () => { },
        [OferTranstionName.OUTPUT]: () => { },
      },
    });
    this.stateMachine.setLogInstance(this.ofer.getLogManager());
  }

  public config() {
    this.stateMachine.getApi(OferTranstionName.CONFIG)();
  }

  public read() {
    this.stateMachine.getApi(OferTranstionName.READ)();
  }

  private transtionConfig() {
    const configManager = this.ofer.getConfigManager();
  }

  private transtionRead() {
  }
}