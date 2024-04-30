import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { TabNavigationComponent } from './components/';
import { CountdownState } from './interfaces/countdown';
import { TasksState } from './interfaces/tasks';
import { CountdownService, LogsService, TasksService } from './services';

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
    TabNavigationComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy, OnInit {
  countdown!: CountdownState;
  countdownSubscription$: Subscription;
  routerSubscription$: Subscription;
  isLastRouteActive: boolean = false;
  isWeckerRouteActive: boolean = false;
  fireAnimation: boolean = false;
  tasks!: TasksState;
  logs: any;
  constructor(
    private router: Router,
    private countdownService: CountdownService,
    private tasksService: TasksService,
    private logsService: LogsService
  ) {
    this.countdownSubscription$ = this.countdownService
      .getCountdownState()
      .subscribe((state) => {
        this.countdown = state;
      });
    this.tasksService.getTasksState().subscribe((state) => {
      this.tasks = state;
    });

    this.logsService.getLogsState().subscribe((logs) => {
      this.logs = logs.logs;
    });

    this.routerSubscription$ = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let lastRouteIndex =
          this.router.config.filter((route) => route.path !== '**').length - 1;

        this.isWeckerRouteActive = this.router.url === '/';
        this.isLastRouteActive =
          this.router.url === `/${this.router.config[lastRouteIndex].path}`;
      });

    const countdownValueIsStartOrBreakStartValue =
      this.countdown.value === this.countdown.breakStartValue ||
      this.countdown.value === this.countdown.startValue;
    const countdownIsNotRunning = !this.countdown.running;
    const breakIsActive = this.countdown.isBreakActive;
    const countdownIsExpired = this.countdown.expired;

    const isAnimationTriggered =
      (countdownValueIsStartOrBreakStartValue &&
        breakIsActive &&
        countdownIsNotRunning) ||
      (countdownValueIsStartOrBreakStartValue &&
        countdownIsExpired &&
        countdownIsNotRunning);
    this.fireAnimation = isAnimationTriggered;
  }

  ngOnInit(): void {
    if (this.countdown.running) {
      this.countdownService.setCountdownRunning();
    }
  }

  ngOnDestroy(): void {
    this.countdownSubscription$.unsubscribe();
    this.routerSubscription$.unsubscribe();
  }
}
