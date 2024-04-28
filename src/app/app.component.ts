import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription, filter } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from './interfaces/app/app.state';
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
import { LogsState } from './interfaces/logs/logs.model';
import { CountdownState } from './interfaces/countdown/countdown.model';
import { TasksState } from './interfaces/tasks/tasks.model';
import { TabNavigationComponent } from './components/tab-navigation/tab-navigation.component';
import { LogsService, TasksService } from './services';

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
export class AppComponent implements OnInit {
  countdown!: CountdownState;
  countdownSubscription$: Subscription;
  isLastRouteActive: boolean = false;
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
        state.tasks.length > 1 &&
        !state.tasks.map((task) => task.isDone).includes(false);
    });
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let lastRouteIndex =
          this.router.config.filter((route) => route.path !== '**').length - 1;

        this.isLastRouteActive = this.router.isActive(
          this.router.config[lastRouteIndex].path!,
          true
        );
      });
  }
}
