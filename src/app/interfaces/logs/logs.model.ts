import { Observable } from 'rxjs';

export interface Log {
  id: string;
  type: string;
  timestamp: number;
}

export interface ILogsService {
  getLogsState: () => Observable<LogsState>;
  addLog: (log: Log) => void;
  removeLog: (log: Log['id']) => void;
  resetLogs: () => void;
}

export interface LogsState {
  logs: Array<Log>;
}
