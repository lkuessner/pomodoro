import { createSelector, createFeatureSelector } from '@ngrx/store';
import { LogsState } from '../../interfaces/logs';

export const selectLogs = createFeatureSelector<LogsState>('logs');

export const selectLogState = createSelector(selectLogs, (logs) => {
  return logs;
});
