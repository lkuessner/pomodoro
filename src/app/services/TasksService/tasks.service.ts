import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ITasksService, Task, TasksState } from '../../interfaces/tasks';
import { AppState } from '../../interfaces/app';
import { TasksActions } from '../../state/tasks';
import { selectTasksState } from '../../state/tasks';

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
    this.store.dispatch(TasksActions.addTask({ taskTitle }));
  }

  removeTask(taskId: Task['id']) {
    this.store.dispatch(TasksActions.removeTask({ taskId }));
  }

  addExmapleData() {
    this.store.dispatch(TasksActions.addExmapleData());
  }

  setIsAllTasksDone(isAllTasksDone: TasksState['isAllTasksDone']) {
    this.store.dispatch(TasksActions.setIsAllTasksDone({ isAllTasksDone }));
  }

  setTaskTitle(taskId: Task['id'], taskTitle: Task['title']) {
    this.store.dispatch(TasksActions.setTaskTitle({ taskId, taskTitle }));
  }

  setTaskIsDone(taskId: Task['id'], value: Task['isDone']) {
    this.store.dispatch(TasksActions.setTaskIsDone({ taskId, value }));
  }

  setTaskIsActive(taskId: Task['id'], value: Task['isActive']) {
    this.store.dispatch(TasksActions.setTaskIsActive({ taskId, value }));
  }

  resetAllTasksIsActive() {
    this.store.dispatch(TasksActions.resetAllTasksIsActive());
  }

  resetAllTasksIsDone() {
    this.store.dispatch(TasksActions.resetAllTasksIsDone());
  }

  clearAllTasks() {
    this.store.dispatch(TasksActions.clearAllTasks());
  }
}
