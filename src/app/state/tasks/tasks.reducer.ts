import { createReducer, on } from '@ngrx/store';

import { TaskActions } from './tasks.actions';
import { buildTask, compareTasksIsDone } from '../../functions';
import { TasksState } from '../../interfaces/tasks/tasks.model';

export const initialState: TasksState = {
  tasks: [],
};

export const tasksReducer = createReducer(
  initialState,
  on(TaskActions.addTask, (state, { taskTitle }) => {
    const newTask = buildTask(taskTitle);
    return {
      ...state,
      tasks: [...state.tasks, newTask],
    };
  }),
  on(TaskActions.addExmapleData, (state) => {
    return {
      ...state,
      tasks: [
        buildTask('Müll rausbringen'),
        buildTask('Küche putzen'),
        buildTask('Buch lesen'),
        buildTask('Auto putzen'),
      ],
    };
  }),
  on(TaskActions.removeTask, (state, { taskId }) => {
    const filteredTasks = state.tasks.filter((task) => task.id !== taskId);
    state = { ...state, tasks: filteredTasks };
    return state;
  }),
  on(TaskActions.setTaskTitle, (state, { taskId, taskTitle }) => {
    const taskIndex = state.tasks.findIndex((task) => task.id === taskId);

    if (taskIndex !== -1) {
      const updatedTasks = [...state.tasks];
      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        title: taskTitle,
      };

      return { ...state, tasks: updatedTasks };
    } else {
      throw new Error(`No task found with taskId ${taskId} to set title.`);
    }
  }),
  on(TaskActions.setTaskIsDone, (state, { taskId, value }) => {
    return {
      ...state,
      tasks: state.tasks
        .map((task) => {
          if (task.id === taskId) {
            return { ...task, isDone: value };
          }
          return task;
        })
        .sort(compareTasksIsDone),
    };
  }),
  on(TaskActions.setTaskIsActive, (state, { taskId, value }) => {
    return {
      ...state,
      tasks: state.tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isActive: value };
        }
        return task;
      }),
    };
  }),
  on(TaskActions.resetAllTasksIsActive, (state) => ({
    ...state,
    tasks: state.tasks.map((task) => ({
      ...task,
      isActive: false,
    })),
  })),
  on(TaskActions.resetAllTasksIsDone, (state) => ({
    ...state,
    tasks: state.tasks.map((task) => ({
      ...task,
      isDone: false,
    })),
  })),
  on(TaskActions.clearAllTasks, (state) => ({
    ...state,
    tasks: [],
  }))
);
