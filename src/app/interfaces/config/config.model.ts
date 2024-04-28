export interface ConfigState {
  taskDuration: number;
  breakDuration: number;
}

export interface IConfigService {
  updateConfigState(config: ConfigState): void;
}
