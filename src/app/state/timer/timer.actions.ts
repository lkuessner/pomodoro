import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task } from '../../interfaces/task';

export const TimerActions = createActionGroup({
  source: 'Timer',
  events: {
    AddTimer: emptyProps(),
    SetTimerDuration: props<{ duration: number }>(),
    ToggleTimerIsBreakActive: emptyProps(),
    ToggleTimerIsActive: emptyProps(),
    ToggleTimerIsExpired: emptyProps(),
    ResetTimerState: emptyProps(),
  },
});

export const TaskActions = createActionGroup({
  source: 'Task',
  events: {
    AddTask: props<{ taskTitle: Task['title'] }>(),
    RemoveTask: props<{ taskId: Task['id'] }>(),
    SetTaskTitle: props<{
      taskId: Task['id'];
      taskTitle: Task['title'];
    }>(),
    ToggleTaskIsDone: props<{
      taskId: Task['id'];
    }>(),
    ToggleTaskIsActive: props<{ taskId: Task['id'] }>(),
    ResetAllTasksIsActive: emptyProps(),
    ResetAllTasksIsDone: emptyProps(),
    ClearAllTasks: emptyProps(),
  },
});
