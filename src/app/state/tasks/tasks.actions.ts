import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task, TasksState } from '../../interfaces/tasks';

export const TasksActions = createActionGroup({
  source: 'Task',
  events: {
    'Add Task': props<{ taskTitle: Task['title'] }>(),
    'Remove Task': props<{ taskId: Task['id'] }>(),
    'Set task title': props<{
      taskId: Task['id'];
      taskTitle: Task['title'];
    }>(),
    'Set is all tasks done': props<{
      isAllTasksDone: TasksState['isAllTasksDone'];
    }>(),
    'Set task isDone': props<{
      taskId: Task['id'];
      value: Task['isDone'];
    }>(),
    'Add Exmaple Data': emptyProps(),
    'Set Task is Active': props<{
      taskId: Task['id'];
      value: Task['isDone'];
    }>(),
    'Reset all tasks is active': emptyProps(),
    'Reset all tasks isDone': emptyProps(),
    'Clear all tasks': emptyProps(),
  },
});
