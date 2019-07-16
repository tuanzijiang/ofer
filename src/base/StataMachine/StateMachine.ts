export interface StateMachineTransition<T, M> {
  name: keyof M,
  from: T,
  to: T,
};

export interface StateMachineProps<T, M> {
  init: T;
  transitions: StateMachineTransition<T, M>[]
};

export class StateMachine<T, M> {
  private state: T;
  private transition: StateMachineTransition<T, M>[];

  constructor(props: StateMachineProps<T, M>) {
    const { init, transitions } = props;
    this.state = init;
    this.transition = transitions;
  }
}
