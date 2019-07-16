import { StateMachine } from '../../base/StataMachine/index';
import { OferState, OferTranstionMap, OferTranstionName } from './schema';

const transitions = [
  { from: OferState.INIT, to: OferState.READ_FILE, name: OferTranstionName.READ },
];

export class OferStateMachine extends StateMachine<OferState, OferTranstionMap> {
  constructor() {
    super({
      transitions,
      init: OferState.INIT,
    });
  }
}