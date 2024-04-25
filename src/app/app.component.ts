import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { ConfigService } from './services/ConfigService/config.service';
import { LogService } from './services/LogService/log.service';
import { CommonModule } from '@angular/common';
import { TimerService } from './services/TimerService/timer.service';
import { Observable, Subscription, filter } from 'rxjs';
import { Timer } from './interfaces/timer';
import { TabNavigationComponent } from './components/tab-navigation/tab-navigation.component';

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
  taskInputValue: number | undefined;
  breakInputValue: number | undefined;
  logId: string = '';
  timers$: Observable<Array<Timer>> | undefined;
  firstTimerId: string = '';
  firstTaskId: string = '';
  lastRouteIsActive: boolean = false;
  private routerEventsSubscription: Subscription | undefined;

  constructor(
    private configService: ConfigService,
    private logService: LogService,
    private timerService: TimerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.configService.getConfigState().subscribe((state) => {
      this.taskInputValue = state.taskDuration;
      this.breakInputValue = state.breakDuration;
    });
    this.timers$ = this.timerService.getAllTimers();
    this.timers$.subscribe((timer) => {
      this.firstTimerId = timer[0].id;
      this.firstTaskId = timer[0]?.tasks[0]?.id;
    });
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
  }

  ngOnDestroy(): void {
    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe();
    }
  }

  /** TimerService Methods */
  addTimer() {
    return this.timerService.addTimer();
  }

  toggleTimerIsActive() {
    return this.timerService.toggleTimerIsActive(this.firstTimerId);
  }

  toggleTimerIsExpired() {
    return this.timerService.toggleTimerIsExpired(this.firstTimerId);
  }

  addTask() {
    return this.timerService.addTask(this.firstTimerId, 'Beispiel Task Titel');
  }

  removeTask() {
    return this.timerService.removeTask(this.firstTimerId, this.firstTaskId);
  }

  setTaskTitle() {
    return this.timerService.setTaskTitle(
      this.firstTimerId,
      this.firstTaskId,
      'Changed Task title'
    );
  }

  setTaskDone() {
    return this.timerService.toggleTaskIsDone(
      this.firstTimerId,
      this.firstTaskId
    );
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

  setTaskDuration() {
    if (this.taskInputValue)
      this.configService.setTaskDuration(this.taskInputValue);
  }

  setBreakDuration() {
    if (this.breakInputValue)
      this.configService.setBreakDuration(this.breakInputValue);
  }

  handleTaskDurationChange(event: Event) {
    const newValue = Number((event.target as HTMLInputElement).value);
    this.taskInputValue = newValue;
  }

  handleBreakDurationChange(event: Event) {
    const newValue = Number((event.target as HTMLInputElement).value);
    this.breakInputValue = newValue;
  }

  handleLogIdInputChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.logId = inputValue;
  }
}
