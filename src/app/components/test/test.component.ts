import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../interfaces/app/app.state';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LogsState } from '../../interfaces/logs/logs.model';
import { TasksState } from '../../interfaces/tasks/tasks.model';
import { CountdownState } from '../../interfaces/countdown/countdown.model';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent {
  countdown$: Observable<CountdownState>;
  tasks$: Observable<TasksState>;
  logs$: Observable<LogsState>;
  constructor(private store: Store<AppState>) {
    this.countdown$ = this.store.pipe(select('countdown'));
    this.tasks$ = this.store.pipe(select('tasks'));
    this.logs$ = this.store.pipe(select('logs'));
  }
}
