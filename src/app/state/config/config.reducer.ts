import { createReducer, on } from '@ngrx/store';

import { ConfigActions } from './config.actions';
import { Config } from '../../interfaces/config';

export const initialState: Config = {
  taskDuration: 25,
  breakDuration: 5,
};

export const configReducer = createReducer(
  initialState,
  on(ConfigActions.getConfigState, (_state) => {
    return _state;
  }),
  on(
    ConfigActions.updateTaskDuration,
    (state, action) =>
      (state = {
        taskDuration: action.taskDuration,
        breakDuration: state.breakDuration,
      })
  ),
  on(
    ConfigActions.updateBreakDuration,
    (state, action) =>
      (state = {
        breakDuration: action.breakDuration,
        taskDuration: state.taskDuration,
      })
  )
);
