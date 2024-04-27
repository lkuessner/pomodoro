import { Observable } from 'rxjs';
import { Task } from '../task';

export interface Timer {
  id: string;
  tasks: Array<Task>;
  isBreakActive: boolean;
  isActive: boolean;
  isExpired: boolean;
}

export type TimerStoreStateType = Timer;

export type TimerServiceStateType = Observable<TimerStoreStateType>;

export interface TimerMethods {
  toggleTimerIsActive: (timerId: Timer['id']) => void;
}

export interface TaskMethods {
  addTask: (taskTitle: Task['title']) => void;
  getTask: (taskId: Task['id']) => void;
  removeTask: (taskId: Task['id']) => void;
  setTaskTitle: (taskTitle: Task['title']) => void;
  setTaskDone: (taskId: Task['id']) => void;
}

export interface ITimerService extends TimerMethods {
  timer$: Observable<Timer>;
}
