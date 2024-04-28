export interface Log {
  id: string;
  type: string;
  timestamp: number;
}

export interface ILogsService {
  addLog: (log: Log) => void;
  removeLog: (log: Log['id']) => void;
  resetLogs: () => void;
}

export interface LogsState {
  logs: Array<Log>;
}
