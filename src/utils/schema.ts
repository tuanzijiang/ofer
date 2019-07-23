export interface HandleCurrFile {
  (path: string): void;
}

export interface ShouldBeStop {
  (path: string): boolean;
}