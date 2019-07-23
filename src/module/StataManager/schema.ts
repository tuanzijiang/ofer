// StateMachine
export interface StateMachineTransition<T, K extends keyof M, M> {
  name: K,
  from: T,
  to: T,
};

export interface StateMachineProps<T, K extends keyof M, M> {
  init: T;
  transitions: StateMachineTransition<T, K, M>[];
  methods: {
    [name in K]: M[K];
  };
};

export type StateMachineInfoMap<T extends string, K extends keyof M, M> = {
  [name in K]?: {
    from: T;
    to: T;
    method: M[K];
  };
}

// StateManager 
export enum OferState {
  INIT = 'INIT', // 初始化状态
  FETCH_CONFIG = 'FETCH_CONFIG', // 获取config
  READ_FILE = 'READ_FILE', // 读取文件（输入数据，工具集，问题...）
  RESOLVE_DATA = 'RESOLVE_DATA', // 解析读取的数据，并作出相应的改变
  EXEC = 'EXEC', // 运行相应的代码
  OUTPUT_FILE = 'OUTPUT_FILE' // 对答案进行输出
};

export enum OferTranstionName {
  CONFIG = 'CONFIG',
  READ = 'READ',
  RESOLVE = 'RESOLVE',
  EXEC = 'EXEC',
  OUTPUT = 'OUTPUT',
};

export interface OferTranstionMap {
  [OferTranstionName.CONFIG](): void;
  [OferTranstionName.READ](): void;
  [OferTranstionName.RESOLVE](): void;
  [OferTranstionName.EXEC](): void;
  [OferTranstionName.OUTPUT](): void;
}
