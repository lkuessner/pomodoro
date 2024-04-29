import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, filter } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CountdownService } from './services/CountdownService/countdown.service';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { CountdownState } from './interfaces/countdown/countdown.model';
import { TabNavigationComponent } from './components/tab-navigation/tab-navigation.component';
import { TasksService } from './services';

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
  fireAnimation: boolean = false;
  allTasksDone: boolean = false;

  constructor(
    private router: Router,
    private countdownService: CountdownService,
    private tasksService: TasksService
  ) {
    this.countdownSubscription$ = this.countdownService
      .getCountdownState()
      .subscribe((state) => {
        this.countdown = state;
      });
    this.tasksService.getTasksState().subscribe((state) => {
      this.allTasksDone =
        state.tasks.length >= 1 &&
        !state.tasks.map((task) => task.isDone).includes(false);
    });

    this.routerSubscription$ = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let lastRouteIndex =
          this.router.config.filter((route) => route.path !== '**').length - 1;

        this.isLastRouteActive = this.router.isActive(
          this.router.config[lastRouteIndex].path!,
          true
        );
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
