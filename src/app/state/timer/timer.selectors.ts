import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Timer } from '../../interfaces/timer';
import { TimerStoreStateType } from '../../interfaces/timer/timer.model';
import { Task } from '../../interfaces/task';

export const selectTimerStore =
  createFeatureSelector<TimerStoreStateType>('timers');

export const selectTimerStoreState = createSelector(
  selectTimerStore,
  (state) => {
    return state;
  }
);

export const selectAllTimers = createSelector(
  selectTimerStoreState,
  (config) => {
    return config.timers;
  }
);

export const selectActiveTimers = createSelector(
  selectTimerStoreState,
  (config) => {
    return config.activeTimers;
  }
);

export const selectExpiredTimers = createSelector(
  selectTimerStoreState,
  (config) => {
    return config.expiredTimers;
  }
);

export const selectTimerById = (timerId: Timer['id']) =>
  createSelector(selectAllTimers, (state) => {
    const timer = state.find((timer) => timer.id === timerId);
    if (timer) {
      return timer;
    } else {
      return new Error(`No Task with ID ${timerId} found.`);
    }
  });

export const selectTaskById = (timerId: Timer['id'], taskId: Task['id']) =>
  createSelector(selectAllTimers, (state) => {
    const task = state
      .find((timer) => timer.id === timerId)
      ?.tasks.find((task) => task.id === taskId);
    if (task) {
      return task;
    } else {
      throw new Error(`No Task with ID ${taskId} found.`);
    }
  });
