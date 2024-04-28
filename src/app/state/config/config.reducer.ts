import { createReducer, on } from '@ngrx/store';

import { ConfigActions } from './config.actions';
import { ConfigState } from '../../interfaces/config/config.model';

export const initialState: ConfigState = {
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
