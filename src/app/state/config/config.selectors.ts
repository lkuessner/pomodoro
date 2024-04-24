import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Config } from '../../interfaces/config';

export const selectConfig = createFeatureSelector<Config>('config');

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
