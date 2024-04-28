import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ITasksService, Task } from '../../interfaces/tasks';
import { TaskActions } from '../../state/tasks/tasks.actions';
import { AppState } from '../../interfaces/app/app.state';
import { selectTasksState } from '../../state/tasks/tasks.selectors';

@Injectable({
  providedIn: 'root',
})
export class TasksService implements ITasksService {
  constructor(private store: Store<AppState>) {}

  /* Selectors */

  getTasksState() {
    return this.store.select(selectTasksState);
  }

  /* Actions */

  addTask(taskTitle: Task['title']) {
    this.store.dispatch(TaskActions.addTask({ taskTitle }));
  }

  removeTask(taskId: Task['id']) {
    this.store.dispatch(TaskActions.removeTask({ taskId }));
  }

  addExmapleData() {
    this.store.dispatch(TaskActions.addExmapleData());
  }

  setTaskTitle(taskId: Task['id'], taskTitle: Task['title']) {
    this.store.dispatch(TaskActions.setTaskTitle({ taskId, taskTitle }));
  }

  setTaskIsDone(taskId: Task['id'], value: Task['isDone']) {
    this.store.dispatch(TaskActions.setTaskIsDone({ taskId, value }));
  }

  setTaskIsActive(taskId: Task['id'], value: Task['isActive']) {
    this.store.dispatch(TaskActions.setTaskIsActive({ taskId, value }));
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
