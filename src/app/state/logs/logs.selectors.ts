import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LogsState } from '../../interfaces/logs';

export const selectLogs = createFeatureSelector<LogsState>('logs');

export const selectLogsState = createSelector(selectLogs, (logs) => {
  return logs;
});
