import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { isObservable } from '../../functions';
import { Task } from '../../interfaces/task';
import { Timer, TimerServiceStateType } from '../../interfaces/timer';
import { TaskActions, TimerActions } from '../../state/timer/timer.actions';
import {
  selectActiveTimers,
  selectAllTimers,
  selectExpiredTimers,
  selectTimerById,
  selectTimerStoreState,
} from '../../state/timer/timer.selectors';
import {
  ITimerService,
  TimerStoreStateType,
} from '../../interfaces/timer/timer.model';

@Injectable({
  providedIn: 'root',
})
export class TimerService implements ITimerService {
  timers$: Observable<Timer[]>;
  activeTimers$: Observable<Array<Timer['id']>>;
  expiredTimers$: Observable<Array<Timer['id']>>;
  constructor(private store: Store) {
    this.timers$ = this.getAllTimers();
    this.activeTimers$ = this.getActiveTimers();
    this.expiredTimers$ = this.getExpiredTimers();
  }

  /* Selectors */
  getTimerState(): TimerServiceStateType {
    return this.store.select(selectTimerStoreState);
  }

  getAllTimers(): Observable<TimerStoreStateType['timers']> {
    return this.store.select(selectAllTimers);
  }

  getTimerById(timerId: Timer['id']): Observable<Timer> | Error {
    const timerById = this.store.select(selectTimerById(timerId));
    if (isObservable<Timer>(timerById)) {
      return timerById;
    } else return new Error(`No timer with ID ${timerId} found.`);
  }

  getActiveTimers(): Observable<TimerStoreStateType['activeTimers']> {
    return this.store.select(selectActiveTimers);
  }

  getExpiredTimers(): Observable<TimerStoreStateType['expiredTimers']> {
    return this.store.select(selectExpiredTimers);
  }

  /* Actions */
  addTimer() {
    this.store.dispatch(TimerActions.addTimer());
  }

  toggleTimerIsActive(timerId: Timer['id']) {
    this.store.dispatch(TimerActions.toggleTimerIsActive({ timerId }));
  }

  toggleTimerIsExpired(timerId: Timer['id']) {
    this.store.dispatch(TimerActions.toggleTimerIsExpired({ timerId }));
  }

  addTask(timerId: Timer['id'], taskTitle: Task['title']) {
    this.store.dispatch(TaskActions.addTask({ timerId, taskTitle }));
  }

  removeTask(timerId: Timer['id'], taskId: Task['id']) {
    this.store.dispatch(TaskActions.removeTask({ timerId, taskId }));
  }

  setTaskTitle(
    timerId: Timer['id'],
    taskId: Task['id'],
    taskTitle: Task['title']
  ) {
    this.store.dispatch(
      TaskActions.setTaskTitle({ timerId, taskId, taskTitle })
    );
  }

  toggleTaskIsDone(timerId: Timer['id'], taskId: Task['id']) {
    this.store.dispatch(TaskActions.toggleTaskIsDone({ timerId, taskId }));
  }
}
