import { OferStateMachine } from './biz/OferStateMachine/index';

export class Ofer {
  private oferStateMachine: OferStateMachine;

  constructor() {
    this.oferStateMachine = new OferStateMachine;
  }
}