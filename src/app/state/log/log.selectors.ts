import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Log } from '../../interfaces/log';

export const selectLogProp = createFeatureSelector<Array<Log>>('logs');

export const selectLogState = createSelector(selectLogProp, (logs) => {
  return logs;
});
