import { createReducer, on } from '@ngrx/store';

import { TaskActions, TimerActions } from './timer.actions';
import { Timer, TimerStoreStateType } from '../../interfaces/timer';
import { Task } from '../../interfaces/task';
import { uuidv4 } from '../../functions';

const buildTask = (taskTitle: Task['title']): Task => {
  return {
    id: uuidv4(),
    isDone: false,
    title: taskTitle,
  };
};

const defaultTimerObject: Timer = {
  id: uuidv4(),
  tasks: [buildTask('Erster Task Initial')],
  duration: 0,
  isActive: false,
  isExpired: false,
};

export const initialState: TimerStoreStateType = {
  timers: [defaultTimerObject],
  activeTimers: [],
  expiredTimers: [],
};

export const timerReducer = createReducer(
  initialState,
  on(TimerActions.addTimer, (state) => {
    const { timers } = state;
    const expandedTimers = [...timers, defaultTimerObject];
    state = { ...state, timers: expandedTimers };
    return state;
  }),
  on(TimerActions.toggleTimerIsActive, (state, { timerId }) => {
    const indexOfTimer = state.timers.map((timer) => timer.id).indexOf(timerId);
    const restTimers = state.timers.filter((timer) => timer.id !== timerId);
    let timerById = state.timers[indexOfTimer];
    const changedTimer = { ...timerById, isActive: !timerById.isActive };
    state = { ...state, timers: [...restTimers, changedTimer] };
    return state;
  }),
  on(TimerActions.toggleTimerIsExpired, (state, { timerId }) => {
    const indexOfTimer = state.timers.map((timer) => timer.id).indexOf(timerId);
    const restTimers = state.timers.filter((timer) => timer.id !== timerId);
    let timerById = state.timers[indexOfTimer];
    const changedTimer = { ...timerById, isExpired: !timerById.isExpired };
    state = { ...state, timers: [...restTimers, changedTimer] };
    return state;
  }),
  on(TaskActions.addTask, (state, { timerId, taskTitle }) => {
    const { timers } = state;
    const timerIndex = timers.map((timer) => timer.id).indexOf(timerId);
    const restTimers = state.timers.filter((timer) => timer.id !== timerId);
    const targetById = timers[timerIndex];
    const newTask = buildTask(taskTitle);
    if (targetById) {
      const changedTimer: Timer = {
        ...targetById,
        tasks: [...targetById.tasks, newTask],
      };

      state = { ...state, timers: [...restTimers, changedTimer] };

      return state;
    } else {
      throw new Error(
        `No Timer to add a new Task with TimerID ${timerId} found.`
      );
    }
  }),
  on(TaskActions.removeTask, (state, { timerId, taskId }) => {
    const timerById = state.timers.find((timer) => timer.id === timerId);
    const restTimers = state.timers.filter((timer) => timer.id !== timerId);
    const filteredTasks = timerById?.tasks.filter((task) => task.id !== taskId);

    if (timerById !== undefined && filteredTasks !== undefined) {
      const changedTimer: Timer = {
        ...timerById,
        tasks: filteredTasks,
      };

      state = { ...state, timers: [...restTimers, changedTimer] };

      return state;
    } else {
      throw new Error(
        `No Timer to add a new Task with TimerID ${timerId} found.`
      );
    }
  }),
  on(TaskActions.setTaskTitle, (state, { timerId, taskId, taskTitle }) => {
    const timerById = state.timers.find((timer) => timer.id === timerId);
    const taskById = timerById?.tasks.find((task) => task.id === taskId);
    if (timerById !== undefined && taskById !== undefined) {
      const changedTask = { ...taskById, title: taskTitle };
      const restTimers = state.timers.filter((timer) => timer.id !== timerId);
      const restTasks = timerById?.tasks.filter((task) => task.id !== taskId);
      const changedTimer: Timer = {
        ...timerById,
        tasks: [...restTasks, changedTask],
      };

      state = { ...state, timers: [...restTimers, changedTimer] };

      return state;
    } else {
      throw new Error(
        `No Timer to add a new Task with TimerID ${timerId} found.`
      );
    }
  }),
  on(TaskActions.toggleTaskIsDone, (state, { timerId, taskId }) => {
    const timerById = state.timers.find((timer) => timer.id === timerId);
    const taskById = timerById?.tasks.find((task) => task.id === taskId);
    if (timerById !== undefined && taskById !== undefined) {
      const changedTask = { ...taskById, isDone: !taskById.isDone };
      const restTimers = state.timers.filter((timer) => timer.id !== timerId);
      const restTasks = timerById?.tasks.filter((task) => task.id !== taskId);
      const changedTimer: Timer = {
        ...timerById,
        tasks: [...restTasks, changedTask],
      };

      state = { ...state, timers: [...restTimers, changedTimer] };

      return state;
    } else {
      throw new Error(
        `No Timer to add a new Task with TimerID ${timerId} found.`
      );
    }
  })
);
