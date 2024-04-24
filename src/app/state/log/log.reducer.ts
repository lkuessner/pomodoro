import { createReducer, on } from '@ngrx/store';

import { LogActions } from './log.actions';
import { Log } from '../../interfaces/log';

export const initialState: Array<Log> | [] = [];

export const logReducer = createReducer(
  initialState,
  on(LogActions.addLog, (state, action) => {
    state = [...state, action.log];
    return state;
  }),
  on(LogActions.removeLogById, (state, action) => {
    state = state.filter((log) => log.id !== action.logId);
    console.log(state);

    return state;
  }),
  on(LogActions.getLogState, (state, _action) => {
    return state;
  }),
  on(LogActions.resetLogState, (state, _action) => {
    state = initialState;
    return state;
  })
);
