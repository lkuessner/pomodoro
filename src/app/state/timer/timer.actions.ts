import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Timer } from '../../interfaces/timer/timer.model';
import { Task } from '../../interfaces/task';

export const TimerActions = createActionGroup({
  source: 'Timer',
  events: {
    AddTimer: emptyProps(),
    ToggleTimerIsActive: props<{
      timerId: Timer['id'];
    }>(),
    ToggleTimerIsExpired: props<{
      timerId: Timer['id'];
    }>(),
    ResetTimerState: emptyProps(),
  },
});

export const TaskActions = createActionGroup({
  source: 'Task',
  events: {
    AddTask: props<{ timerId: Timer['id']; taskTitle: Task['title'] }>(),
    RemoveTask: props<{ timerId: Timer['id']; taskId: Task['id'] }>(),
    SetTaskTitle: props<{
      timerId: Timer['id'];
      taskId: Task['id'];
      taskTitle: Task['title'];
    }>(),
    toggleTaskIsDone: props<{
      timerId: Timer['id'];
      taskId: Task['id'];
    }>(),
  },
});
