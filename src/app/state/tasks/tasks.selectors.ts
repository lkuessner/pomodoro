import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Task } from '../../interfaces/tasks';
import { compareTasksIsDone } from '../../functions';
import { TasksState } from '../../interfaces/tasks/tasks.model';

export const selectTasksStore = createFeatureSelector<TasksState>('tasks');

export const selectTasksState = createSelector(selectTasksStore, (state) => {
  return state;
});

export const selectTaskById = (taskId: Task['id']) =>
  createSelector(selectTasksState, (state) => {
    const task = state.tasks.find((task) => task.id === taskId);
    if (task) {
      return task;
    } else {
      throw new Error(`No Task with ID ${taskId} found.`);
    }
  });
