import { ConfigState } from '../config';
import { CountdownState } from '../countdown';
import { LogsState } from '../logs';
import { TasksState } from '../tasks';

export interface AppState {
  countdown: CountdownState;
  tasks: TasksState;
  logs: LogsState;
  config: ConfigState;
}
