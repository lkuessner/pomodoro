import { Observable } from 'rxjs';
import { Task } from '../task';

export interface Timer {
  id: string;
  tasks: Array<Task>;
  duration: number;
  isActive: boolean;
  isExpired: boolean;
}

export interface TimerStoreStateType {
  timers: Array<Timer>;
  activeTimers: Array<Timer['id']>;
  expiredTimers: Array<Timer['id']>;
}

export type TimerServiceStateType = Observable<TimerStoreStateType>;

export interface TimerMethods {
  addTimer: () => void;
  // setTimerIsActive: (
  //   timerId: Timer['id'],
  //   isTimerActive: Timer['isActive']
  // ) => void;
  // setTimerIsExpired: (
  //   timerId: Timer['id'],
  //   isTimerExpired: Timer['isExpired']
  // ) => void;
  toggleTimerIsActive: (timerId: Timer['id']) => void;
  getTimerById: (timerId: Timer['id']) => Observable<Timer> | Error;
  getAllTimers: () => Observable<Array<Timer>>;
  // resetTimerState: () => void;
}

export interface TaskMethods {
  addTask: (timerId: Timer['id'], taskTitle: Task['title']) => void;
  getTask: (timerId: Timer['id'], taskId: Task['id']) => void;
  removeTask: (timerId: Timer['id'], taskId: Task['id']) => void;
  setTaskTitle: (timerId: Timer['id'], taskTitle: Task['title']) => void;
  setTaskDone: (timerId: Timer['id'], taskId: Task['id']) => void;
}

export interface ITimerService extends TimerMethods {
  timers$: Observable<Array<Timer>>;
  activeTimers$: Observable<Array<Timer['id']>>;
  expiredTimers$: Observable<Array<Timer['id']>>;
}
