import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatIconButtonSizesModule } from 'mat-icon-button-sizes';
import {
  NEVER,
  Observable,
  Subject,
  Subscription,
  interval,
  scan,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs';
import { AddEditTaskDialogComponent } from './AddEditTaskDialog/addEditTaskDialog.component';
import { ConfirmDialog } from './ConfirmDialog/confirmDialog.component';
import { Task } from '../../interfaces/tasks';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import { CountdownService } from '../../services/CountdownService/countdown.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../interfaces/app/app.state';
import { LogsState } from '../../interfaces/logs/logs.model';
import { TasksState } from '../../interfaces/tasks/tasks.model';
import { CountdownState } from '../../interfaces/countdown/countdown.model';
import { ConfigState } from '../../interfaces/config';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatIconButtonSizesModule,
    MatCardModule,
    RouterModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class TimerComponent {
  countdown$: Observable<CountdownState>;
  tasks$: Observable<TasksState>;
  logs$: Observable<LogsState>;
  config$: Observable<ConfigState>;
  constructor(private store: Store<AppState>) {
    this.countdown$ = this.store.pipe(select('countdown'));
    this.tasks$ = this.store.pipe(select('tasks'));
    this.logs$ = this.store.pipe(select('logs'));
    this.config$ = this.store.pipe(select('config'));
  }

  // timer!: Timer;
  // timerCounter!: number;
  // originalTimerDuration: number = 0;
  // originalBreakDuration: number = 0;
  // currentTask!: Task;
  // allTasksDone: boolean = false;
  // taskDurationSubscription: Subscription;
  // getTimerSubscription: Subscription;
  // countdownSubscription!: Subscription;
  // private stop$ = new Subject<boolean>();
  // control$ = new Subject<'start' | 'pause' | 'reset'>();
  // countdown$!: Observable<number>;
  // constructor(
  //   private configService: ConfigService,
  //   private timerService: TimerService,
  //   public dialog: MatDialog
  // ) {
  //   this.taskDurationSubscription = this.configService
  //     .getConfigState()
  //     .subscribe((value) => {
  //       this.timerCounter = value.taskDuration;
  //       this.originalTimerDuration = value.taskDuration;
  //       this.originalBreakDuration = value.breakDuration;
  //     });
  //   this.taskDurationSubscription.unsubscribe();
  //   this.getTimerSubscription = this.timerService
  //     .getTimer()
  //     .subscribe((timerState) => {
  //       this.timer = timerState;
  //       if (timerState.tasks[0]) this.currentTask = timerState.tasks[0];
  //       this.allTasksDone = !timerState.tasks
  //         .map((task) => task.isDone)
  //         .includes(false);
  //     });
  //   this.initNewCounter();
  // }
  // ngOnDestroy(): void {
  //   console.log('timer component destroyed');
  // }
  // initNewCounter() {
  //   this.countdownSubscription?.unsubscribe();
  //   const newCountdown = this.control$.pipe(
  //     startWith('none'),
  //     switchMap((control) => {
  //       if (control === 'start') {
  //         const isCurrentTaskActive = this.currentTask.isActive;
  //         const isCurrentTimerActive = this.timer.isActive;
  //         const isBreakActive = this.timer.isBreakActive;
  //         const isTimerExpired = this.timer.isExpired;
  //         if (isTimerExpired) {
  //           this.timerService.toggleTimerIsExpired();
  //         }
  //         if (!isCurrentTaskActive && !isBreakActive) {
  //           this.timerService.toggleTaskIsActive(this.currentTask.id);
  //         }
  //         if (!isCurrentTimerActive) {
  //           this.timerService.toggleTimerIsActive();
  //         }
  //         return interval(1000).pipe(
  //           scan((acc) => {
  //             acc = acc - 1;
  //             return acc;
  //           }, this.timerCounter),
  //           takeUntil(this.stop$)
  //         );
  //       } else if (control === 'pause' || control === 'reset') {
  //         return NEVER;
  //       }
  //       return NEVER;
  //     }),
  //     takeUntil(this.stop$)
  //   );
  //   this.countdownSubscription = newCountdown.subscribe((counter) => {
  //     let countdownIsOngoing: boolean = counter >= 0;
  //     if (countdownIsOngoing) {
  //       this.timerCounter = counter;
  //     } else {
  //       this.stop$.next(true);
  //       this.timerService.toggleTimerIsActive();
  //       this.timerService.toggleTimerIsExpired();
  //       this.timerService.toggleTimerIsBreakActive();
  //       const isBreakActive = this.timer.isBreakActive;
  //       if (isBreakActive) {
  //         this.timerService.toggleTaskIsActive(this.currentTask.id);
  //         this.timerService.toggleTaskIsDone(this.currentTask.id);
  //         this.timerCounter = this.originalBreakDuration;
  //         this.initNewCounter();
  //       } else {
  //         this.timerCounter = this.originalTimerDuration;
  //         this.initNewCounter();
  //       }
  //     }
  //   });
  // }
  // formatTimerDuration(timeInSeconds: number): string {
  //   return format(timeInSeconds);
  // }
  // startTimer() {
  //   this.control$.next('start');
  // }
  // pauseTimer() {
  //   if (this.timer.isActive) {
  //     this.timerService.toggleTimerIsActive();
  //   }
  //   this.control$.next('pause');
  // }
  // resetCurrentTimer() {
  //   this.control$.next('reset');
  //   this.timerCounter = this.originalTimerDuration;
  //   this.initNewCounter();
  // }
  // resetEntireTimer() {
  //   this.control$.next('reset');
  //   this.timerService.resetAllTasksIsActive();
  //   this.timerService.resetAllTasksIsDone();
  //   if (this.timer.isExpired) {
  //     this.timerService.toggleTimerIsExpired();
  //   }
  //   if (this.timer.isActive) {
  //     this.timerService.toggleTimerIsActive();
  //   }
  //   if (this.timer.isBreakActive) {
  //     this.timerService.toggleTimerIsBreakActive();
  //   }
  //   this.timerCounter = this.originalTimerDuration;
  //   this.initNewCounter();
  // }
  // nextTask() {
  //   this.control$.next('reset');
  //   this.toggleTaskIsDone(this.currentTask.id);
  //   this.timerCounter = this.originalTimerDuration;
  //   if (this.currentTask.isActive) {
  //     this.timerService.toggleTaskIsActive(this.currentTask.id);
  //   }
  //   if (this.timer.isActive) {
  //     this.timerService.toggleTimerIsActive();
  //   }
  //   if (this.timer.isBreakActive) {
  //     this.timerService.toggleTimerIsBreakActive();
  //   }
  //   if (this.timer.isExpired) {
  //     this.timerService.toggleTimerIsExpired();
  //   }
  // }
  // toggleTaskIsDone(taskId: string) {
  //   this.timerService.toggleTaskIsDone(taskId);
  // }
  // clearAllTasks() {
  //   const dialogRef = this.dialog.open(ConfirmDialog, {
  //     data: { confirmed: false, prompt: 'Wirklich alle Aufgaben löschen?' },
  //     height: '120px',
  //     width: '400px',
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.timerService.clearAllTasks();
  //     }
  //   });
  // }
  // deleteTaskDialog(taskId: string) {
  //   const dialogRef = this.dialog.open(ConfirmDialog, {
  //     data: { confirmed: false, prompt: 'Aufgabe wirklich löschen?' },
  //     height: '120px',
  //     width: '400px',
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.timerService.removeTask(taskId);
  //     }
  //   });
  // }
  // editTaskDialog(taskTitle: string, taskId: string) {
  //   const dialogRef = this.dialog.open(AddEditTaskDialogComponent, {
  //     data: { dialogTaskTitle: taskTitle },
  //     height: '220px',
  //     width: '350px',
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result?.dialogTaskTitle !== undefined)
  //       this.timerService.setTaskTitle(taskId, result.dialogTaskTitle);
  //   });
  // }
  // addTaskDialog(): void {
  //   const dialogRef = this.dialog.open(AddEditTaskDialogComponent, {
  //     data: { dialogTaskTitle: '' },
  //     height: '220px',
  //     width: '350px',
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result?.dialogTaskTitle !== undefined) {
  //       this.timerService.addTask(result.dialogTaskTitle);
  //     }
  //   });
  // }
  // highlightCounterAndPushNotification() {
  //   this.timerService.toggleTimerIsExpired();
  // }
}
