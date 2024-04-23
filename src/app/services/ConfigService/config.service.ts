import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Config, ConfigServiceStateType } from '../../interfaces/config';
import { ConfigActions } from '../../state/config/config.actions';
import {
  selectConfigBreakDuration,
  selectConfigState,
  selectConfigTaskDuration,
} from '../../state/config/config.selectors';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}

  setTaskDuration = (durationValue: number) => {
    this.store.dispatch(
      ConfigActions.updateTaskDuration({ taskDuration: durationValue })
    );
  };

  setBreakDuration = (durationValue: number) => {
    this.store.dispatch(
      ConfigActions.updateBreakDuration({ breakDuration: durationValue })
    );
  };

  getTaskDuration(): Observable<number> {
    return this.store.select(selectConfigTaskDuration);
  }

  getBreakDuration(): Observable<number> {
    return this.store.select(selectConfigBreakDuration);
  }

  getConfig(): Observable<Config> {
    return this.store.select(selectConfigState);
  }
}
