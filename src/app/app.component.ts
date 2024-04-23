import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfigActions } from './state/config/config.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'pomodoro';
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(
      ConfigActions.updateTaskDuration({ taskDuration: 200 })
    );
    this.store.dispatch(ConfigActions.getConfigState());
  }
}
