import { createReducer, on } from '@ngrx/store';

import { ConfigActions } from './config.actions';
import { Config } from '../../interfaces/config';

export const initialState: Config = {
  taskDuration: 1500,
  breakDuration: 300,
};

export const configReducer = createReducer(
  initialState,
  on(
    ConfigActions.updateConfigState,
    (state, action) =>
      (state = {
        taskDuration: action.taskDuration,
        breakDuration: action.breakDuration,
      })
  )
);
