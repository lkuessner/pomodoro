import { BehaviorSubject, Observable } from 'rxjs';

export interface Log {
  id: string;
  type: string;
  timestamp: number;
}

export type LogServiceStateType = Observable<Array<Log>>;

export interface LogMethods {
  addLog: (log: Log) => void;
  removeLog: (log: Log['id']) => void;
  getLogs: () => Array<Log>;
  resetLogs: () => [];
}

export interface ILogService extends LogMethods {
  logs$: LogServiceStateType;
}
