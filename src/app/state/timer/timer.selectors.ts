import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TimerStoreStateType } from '../../interfaces/timer/timer.model';
import { Task } from '../../interfaces/task';

const compareTasksIsDone = (a: Task, b: Task) => {
  if (a.isDone === b.isDone) {
    return 0;
  } else if (a.isDone) {
    return 1;
  } else {
    return -1;
  }
};

export const selectTimerStore =
  createFeatureSelector<TimerStoreStateType>('timers');

export const selectTimer = createSelector(selectTimerStore, (state) => {
  const sortedTasks = [...state.tasks];

  sortedTasks.sort(compareTasksIsDone);
  return {
    ...state,
    tasks: sortedTasks,
  };
});

export const selectTaskById = (taskId: Task['id']) =>
  createSelector(selectTimer, (state) => {
    const task = state?.tasks.find((task) => task.id === taskId);
    if (task) {
      return task;
    } else {
      throw new Error(`No Task with ID ${taskId} found.`);
    }
  });
