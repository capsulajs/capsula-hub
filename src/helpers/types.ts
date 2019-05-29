export interface RunArgs {
  port: number;
  local?: string;
}

export interface RunOptions {
  localConfig: boolean;
  path?: string;
  port: number;
}
