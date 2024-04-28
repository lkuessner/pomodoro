import { Component, OnDestroy, OnInit } from '@angular/core';
// import {
//   NavigationEnd,
//   Router,
//   RouterLink,
//   RouterLinkActive,
//   RouterOutlet,
// } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, Subscription, filter } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from './interfaces/app/app.state';
import { FormsModule } from '@angular/forms';

import { CountdownService } from './services/CountdownService/countdown.service';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { LogsState } from './interfaces/logs/logs.model';
import { CountdownState } from './interfaces/countdown/countdown.model';
import { TasksState } from './interfaces/tasks/tasks.model';
// import { Timer } from './interfaces/timer';
// import { TabNavigationComponent } from './components/tab-navigation/tab-navigation.component';
// import { ConfigService, LogService, TimerService } from './services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,

    RouterLink,
    RouterLinkActive,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  countdown$: Observable<CountdownState>;
  tasks$: Observable<TasksState>;
  logs$: Observable<LogsState>;
  startValue: number = 60; // Default Startwert

  constructor(
    private store: Store<AppState>,
    private countdownService: CountdownService
  ) {
    this.countdown$ = this.store.pipe(select('countdown'));
    this.tasks$ = this.store.pipe(select('tasks'));
    this.logs$ = this.store.pipe(select('logs'));
  }

  start() {
    this.countdownService.startCountdown();
  }

  stop() {
    this.countdownService.stopCountdown();
  }

  reset() {
    this.countdownService.resetCountdown();
  }

  setStartValue() {
    this.countdownService.setCountdownStartValue(this.startValue);
  }
  // title = 'pomodoro';
  // logId: string = '';
  // timer!: Timer;
  // firstTaskId: string = '';
  // lastRouteIsActive: boolean = false;
  // isBreakActive: boolean = false;
  // allTasksDone: boolean = false;
  // private routerEventsSubscription: Subscription | undefined;

  // constructor(
  //   private router: Router,
  //   private configService: ConfigService,
  //   private timerService: TimerService,
  //   private logService: LogService
  // ) {}

  // ngOnInit(): void {
  //   this.routerEventsSubscription = this.router.events
  //     .pipe(filter((event) => event instanceof NavigationEnd))
  //     .subscribe(() => {
  //       let lastRouteIndex =
  //         this.router.config.filter((route) => route.path !== '**').length - 1;

  //       this.lastRouteIsActive = this.router.isActive(
  //         this.router.config[lastRouteIndex].path!,
  //         true
  //       );
  //     });
  //   this.timerService.getTimer().subscribe((timerState) => {
  //     this.timer = timerState;

  //     this.allTasksDone = !timerState.tasks
  //       .map((task) => task.isDone)
  //       .includes(false);
  //   });
  // }

  // ngOnDestroy(): void {
  //   if (this.routerEventsSubscription) {
  //     this.routerEventsSubscription.unsubscribe();
  //   }
  // }

  // /** TimerService Methods */
  // toggleTimerIsActive() {
  //   return this.timerService.toggleTimerIsActive();
  // }

  // toggleTimerIsExpired() {
  //   return this.timerService.toggleTimerIsExpired();
  // }

  // addTask() {
  //   return this.timerService.addTask('Beispiel Task Titel');
  // }

  // removeTask() {
  //   return this.timerService.removeTask(this.firstTaskId);
  // }

  // setTaskTitle() {
  //   return this.timerService.setTaskTitle(
  //     this.firstTaskId,
  //     'Changed Task title'
  //   );
  // }

  // setTaskDone() {
  //   return this.timerService.toggleTaskIsDone(this.firstTaskId);
  // }

  // /** LogService Methods */
  // getLogState() {
  //   return this.logService.getLogState();
  // }

  // resetLogState() {
  //   this.logService.resetLogState();
  // }
  // removeLogById() {
  //   this.logService.removeLogById(this.logId);
  // }

  // /** ConfigService Methods */
  // getConfig() {
  //   return this.configService.getConfigState();
  // }

  // getTaskDuration() {
  //   return this.configService.getTaskDuration();
  // }

  // getBreakDuration() {
  //   return this.configService.getBreakDuration();
  // }
}
