import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription, filter } from 'rxjs';
import { Timer } from './interfaces/timer';
import { TabNavigationComponent } from './components/tab-navigation/tab-navigation.component';
import { ConfigService, LogService, TimerService } from './services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TabNavigationComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'pomodoro';
  logId: string = '';
  timer!: Timer;
  firstTaskId: string = '';
  lastRouteIsActive: boolean = false;
  isBreakActive: boolean = false;
  allTasksDone: boolean = false;
  private routerEventsSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private configService: ConfigService,
    private timerService: TimerService,
    private logService: LogService
  ) {}

  ngOnInit(): void {
    this.routerEventsSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let lastRouteIndex =
          this.router.config.filter((route) => route.path !== '**').length - 1;

        this.lastRouteIsActive = this.router.isActive(
          this.router.config[lastRouteIndex].path!,
          true
        );
      });
    this.timerService.getTimer().subscribe((timerState) => {
      this.timer = timerState;

      this.allTasksDone = !timerState.tasks
        .map((task) => task.isDone)
        .includes(false);
    });
  }

  ngOnDestroy(): void {
    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe();
    }
  }

  /** TimerService Methods */
  toggleTimerIsActive() {
    return this.timerService.toggleTimerIsActive();
  }

  toggleTimerIsExpired() {
    return this.timerService.toggleTimerIsExpired();
  }

  addTask() {
    return this.timerService.addTask('Beispiel Task Titel');
  }

  removeTask() {
    return this.timerService.removeTask(this.firstTaskId);
  }

  setTaskTitle() {
    return this.timerService.setTaskTitle(
      this.firstTaskId,
      'Changed Task title'
    );
  }

  setTaskDone() {
    return this.timerService.toggleTaskIsDone(this.firstTaskId);
  }

  /** LogService Methods */
  getLogState() {
    return this.logService.getLogState();
  }

  resetLogState() {
    this.logService.resetLogState();
  }
  removeLogById() {
    this.logService.removeLogById(this.logId);
  }

  /** ConfigService Methods */
  getConfig() {
    return this.configService.getConfigState();
  }

  getTaskDuration() {
    return this.configService.getTaskDuration();
  }

  getBreakDuration() {
    return this.configService.getBreakDuration();
  }
}
