import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ITasksService, Task } from '../../interfaces/tasks';
import { TaskActions } from '../../state/tasks/tasks.actions';
import { AppState } from '../../interfaces/app/app.state';

@Injectable({
  providedIn: 'root',
})
export class TasksService implements ITasksService {
  constructor(private store: Store<AppState>) {}

  /* Actions */

  addTask(taskTitle: Task['title']) {
    this.store.dispatch(TaskActions.addTask({ taskTitle }));
  }

  removeTask(taskId: Task['id']) {
    this.store.dispatch(TaskActions.removeTask({ taskId }));
  }

  setTaskTitle(taskId: Task['id'], taskTitle: Task['title']) {
    this.store.dispatch(TaskActions.setTaskTitle({ taskId, taskTitle }));
  }

  setTaskIsDone(taskId: Task['id'], value: Task['isDone']) {
    this.store.dispatch(TaskActions.setTaskIsDone({ taskId, value }));
  }

  setTaskIsActive(taskId: Task['id'], value: Task['isDone']) {
    this.store.dispatch(TaskActions.setTaskIsDone({ taskId, value }));
  }

  resetAllTasksIsActive() {
    this.store.dispatch(TaskActions.resetAllTasksIsActive());
  }

  resetAllTasksIsDone() {
    this.store.dispatch(TaskActions.resetAllTasksIsDone());
  }

  clearAllTasks() {
    this.store.dispatch(TaskActions.clearAllTasks());
  }
}
