import { createReducer, on } from '@ngrx/store';

import { buildTask, compareTasksIsDone } from '../../functions';
import { TasksState } from '../../interfaces/tasks';
import { TasksActions } from './tasks.actions';

export const initialState: TasksState = {
  isAllTasksDone: false,
  tasks: [],
};

export const tasksReducer = createReducer(
  initialState,
  on(TasksActions.addTask, (state, { taskTitle }) => {
    const newTask = buildTask(taskTitle);
    return {
      ...state,
      tasks: [...state.tasks, newTask],
    };
  }),
  on(TasksActions.addExmapleData, (state) => {
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
  on(TasksActions.removeTask, (state, { taskId }) => {
    const filteredTasks = state.tasks.filter((task) => task.id !== taskId);
    state = { ...state, tasks: filteredTasks };
    return state;
  }),
  on(TasksActions.setIsAllTasksDone, (state, { isAllTasksDone }) => {
    return {
      ...state,
      isAllTasksDone,
    };
  }),
  on(TasksActions.setTaskTitle, (state, { taskId, taskTitle }) => {
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
  on(TasksActions.setTaskIsDone, (state, { taskId, value }) => {
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
  on(TasksActions.setTaskIsActive, (state, { taskId, value }) => {
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
  on(TasksActions.resetAllTasksIsActive, (state) => ({
    ...state,
    tasks: state.tasks.map((task) => ({
      ...task,
      isActive: false,
    })),
  })),
  on(TasksActions.resetAllTasksIsDone, (state) => ({
    isAllTasksDone: false,
    tasks: state.tasks.map((task) => ({
      ...task,
      isDone: false,
    })),
  })),
  on(TasksActions.clearAllTasks, (state) => ({
    ...state,
    tasks: [],
  }))
);
