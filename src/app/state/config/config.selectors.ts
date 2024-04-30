import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConfigState } from '../../interfaces/config';

export const selectConfig = createFeatureSelector<ConfigState>('config');

export const selectConfigState = createSelector(selectConfig, (config) => {
  return config;
});

export const selectConfigBreakDuration = createSelector(
  selectConfig,
  (config) => {
    return config.breakDuration;
  }
);

export const selectConfigTaskDuration = createSelector(
  selectConfig,
  (config) => {
    return config.taskDuration;
  }
);
