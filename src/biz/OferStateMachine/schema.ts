export enum OferState {
  INIT = 'INIT', // 初始化状态
  READ_FILE = 'READ_FILE', // 读取文件（配置，输入数据，工具集，问题...）
  RESOLVE_DATA = 'RESOLVE_DATA', // 解析读取的数据，并作出相应的改变
  EXEC = 'EXEC', // 运行相应的代码
  OUTPUT_FILE = 'OUTPUT_FILE' // 对答案进行输出
};

export enum OferTranstionName {
  READ = 'READ',
  RESOLVE = 'RESOLVE',
  EXEC = 'EXEC',
  OUTPUT = 'OUTPUT',
};

export interface OferTranstionMap {
  [OferTranstionName.READ](): void;
  [OferTranstionName.RESOLVE](): void;
  [OferTranstionName.EXEC](): void;
  [OferTranstionName.OUTPUT](): void;
}
