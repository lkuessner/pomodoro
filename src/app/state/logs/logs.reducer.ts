import { createReducer, on } from '@ngrx/store';

import { LogsState } from '../../interfaces/logs';
import { LogsActions } from './logs.actions';

export const initialState: LogsState = {
  logs: [],
};

export const logsReducer = createReducer(
  initialState,
  on(LogsActions.addLog, (state, action) => {
    return { logs: [...state.logs, action.log] };
  }),
  on(LogsActions.removeLogByID, (state, action) => {
    return { logs: [...state.logs.filter((log) => log.id !== action.logId)] };
  }),
  on(LogsActions.resetLogs, (_state, _action) => {
    return { logs: [] };
  })
);
