import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task } from '../../interfaces/tasks';

export const TaskActions = createActionGroup({
  source: 'Task',
  events: {
    AddTask: props<{ taskTitle: Task['title'] }>(),
    RemoveTask: props<{ taskId: Task['id'] }>(),
    SetTaskTitle: props<{
      taskId: Task['id'];
      taskTitle: Task['title'];
    }>(),
    SetTaskIsDone: props<{
      taskId: Task['id'];
      value: Task['isDone'];
    }>(),
    SetTaskIsActive: props<{ taskId: Task['id']; value: Task['isDone'] }>(),
    ResetAllTasksIsActive: emptyProps(),
    ResetAllTasksIsDone: emptyProps(),
    ClearAllTasks: emptyProps(),
  },
});
