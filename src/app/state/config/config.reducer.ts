import { createReducer, on } from '@ngrx/store';

import { ConfigState } from '../../interfaces/config/config.model';
import { ConfigActions } from './config.actions';

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
