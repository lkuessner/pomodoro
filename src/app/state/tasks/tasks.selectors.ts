import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Task, TasksState } from '../../interfaces/tasks';

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
