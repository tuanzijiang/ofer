
import { StateMachineInfoMap, StateMachineProps } from './schema';
import { LogInstance } from '../LogManager/index';
import { isFunction } from '../../utils';

export class StateMachine<T extends string, K extends keyof M, M> {
  private state: T;
  private stateMachineTranstionInfo: StateMachineInfoMap<T, K, M> = {};
  private logInstance: LogInstance;

  constructor(props: StateMachineProps<T, K, M>) {
    const { init, transitions, methods } = props;
    this.state = init;
    transitions.forEach(({ name, from, to }) => {
      const method = methods[name];
      this.stateMachineTranstionInfo[name] = {
        from, to, method,
      };
    });
  }

  public getApi(name: K): M[K] {
    const { method, from, to } = this.stateMachineTranstionInfo[name];
    const result = (...args: any[]) => {
      if (from !== this.state) {
        this.logInstance.error(
          `stateMachine: Current state is ${this.state}. forbidden switch from ${from} to ${to}`
        );
        return;
      }

      if (isFunction(method)) {
        method(...args);
      }
      this.state = to;
      this.logInstance.info(
        `stateMachine: state switchs from ${from} to ${to}`
      );
    };
    return result as unknown as M[K];
  }

  public setLogInstance(logInstance: LogInstance) {
    this.logInstance = logInstance;
  }
}
