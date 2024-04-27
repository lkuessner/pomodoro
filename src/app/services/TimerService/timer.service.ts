import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Task } from '../../interfaces/task';
import { TimerServiceStateType } from '../../interfaces/timer';
import { TaskActions, TimerActions } from '../../state/timer/timer.actions';
import { selectTimer } from '../../state/timer/timer.selectors';
import { ITimerService } from '../../interfaces/timer/timer.model';

@Injectable({
  providedIn: 'root',
})
export class TimerService implements ITimerService, OnInit {
  timer$: TimerServiceStateType;
  constructor(private store: Store) {
    this.timer$ = this.getTimer();
  }

  ngOnInit(): void {}

  /* Selectors */
  getTimer(): TimerServiceStateType {
    return this.store.select(selectTimer);
  }

  /* Actions */

  toggleTimerIsBreakActive() {
    this.store.dispatch(TimerActions.toggleTimerIsBreakActive());
  }

  toggleTimerIsActive() {
    this.store.dispatch(TimerActions.toggleTimerIsActive());
  }

  toggleTimerIsExpired() {
    this.store.dispatch(TimerActions.toggleTimerIsExpired());
  }

  setTimerDuration(duration: number) {
    this.store.dispatch(TimerActions.setTimerDuration({ duration }));
  }

  addTask(taskTitle: Task['title']) {
    this.store.dispatch(TaskActions.addTask({ taskTitle }));
  }

  removeTask(taskId: Task['id']) {
    this.store.dispatch(TaskActions.removeTask({ taskId }));
  }

  setTaskTitle(taskId: Task['id'], taskTitle: Task['title']) {
    this.store.dispatch(TaskActions.setTaskTitle({ taskId, taskTitle }));
  }

  toggleTaskIsDone(taskId: Task['id']) {
    this.store.dispatch(TaskActions.toggleTaskIsDone({ taskId }));
  }

  toggleTaskIsActive(taskId: Task['id']) {
    this.store.dispatch(TaskActions.toggleTaskIsActive({ taskId }));
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
