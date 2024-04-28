import { createReducer, on } from '@ngrx/store';

import { LogsActions } from './logs.actions';
import { LogsState } from '../../interfaces/logs/logs.model';

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
  on(LogsActions.resetLogState, (_state, _action) => {
    return initialState;
  })
);
