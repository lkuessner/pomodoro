import { Observable } from 'rxjs';

export interface Config {
  taskDuration: number;
  breakDuration: number;
}

export type ConfigServiceStateType = Observable<Config>;

export interface ConfigMethods {
  setTaskDuration: (durationValue: number) => void;
  setBreakDuration: (durationValue: number) => void;
}

export interface IConfigService extends ConfigMethods {
  config$: ConfigServiceStateType;
}
