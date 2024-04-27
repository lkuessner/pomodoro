import { createReducer, on } from '@ngrx/store';

import { TaskActions, TimerActions } from './timer.actions';
import { Timer, TimerStoreStateType } from '../../interfaces/timer';
import { Task } from '../../interfaces/task';
import { v4 as uuidv4 } from 'uuid';

const buildTask = (taskTitle: Task['title']): Task => {
  return {
    id: uuidv4(),
    isDone: false,
    isActive: false,
    title: taskTitle,
  };
};

const defaultTimerObject: Timer = {
  id: uuidv4(),
  tasks: [
    buildTask('Müll rausbringen'),
    buildTask('Küche putzen'),
    buildTask('Sport machen'),
  ],
  isBreakActive: false,
  isActive: false,
  isExpired: false,
};

export const initialState: TimerStoreStateType = defaultTimerObject;

export const timerReducer = createReducer(
  initialState,
  on(TimerActions.toggleTimerIsActive, (state) => {
    state = { ...state, isActive: !state.isActive };
    return state;
  }),
  on(TimerActions.toggleTimerIsBreakActive, (state) => {
    state = { ...state, isBreakActive: !state.isBreakActive };
    return state;
  }),
  on(TimerActions.toggleTimerIsExpired, (state) => {
    state = { ...state, isExpired: !state.isExpired };
    return state;
  }),
  on(TaskActions.addTask, (state, { taskTitle }) => {
    const newTask = buildTask(taskTitle);
    state = { ...state, tasks: [...state.tasks, newTask] };
    return state;
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
  on(TaskActions.toggleTaskIsDone, (state, { taskId }) => {
    return {
      ...state,
      tasks: state.tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isDone: !task.isDone };
        }
        return task;
      }),
    };
  }),
  on(TaskActions.toggleTaskIsActive, (state, { taskId }) => {
    return {
      ...state,
      tasks: state.tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isActive: !task.isActive };
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
