import { createReducer, on } from '@ngrx/store';

import { ConfigActions } from './config.actions';
import { Config } from '../../interfaces/config';

export const initialState: Config = {
  taskDuration: 1500,
  breakDuration: 300,
};

export const configReducer = createReducer(
  initialState,
  on(ConfigActions.getConfigState, (_state) => {
    return _state;
  }),
  on(
    ConfigActions.updateConfigState,
    (state, action) =>
      (state = {
        taskDuration: action.taskDuration,
        breakDuration: action.breakDuration,
      })
  )
  // on(
  //   ConfigActions.updateTaskDuration,
  //   (state, action) => (state = { ...state, taskDuration: action.taskDuration })
  // ),
  // on(
  //   ConfigActions.updateBreakDuration,
  //   (state, action) =>
  //     (state = {
  //       ...state,
  //       breakDuration: action.breakDuration,
  //     })
  // )
);
