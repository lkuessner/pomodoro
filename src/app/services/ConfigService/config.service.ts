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
export class ConfigService {
  constructor(private store: Store) {}

  /* Actions */
  updateConfigState = (values: Config) => {
    this.store.dispatch(ConfigActions.updateConfigState(values));
  };

  /* Selectors */

  getTaskDuration(): Observable<number> {
    return this.store.select(selectConfigTaskDuration);
  }

  getBreakDuration(): Observable<number> {
    return this.store.select(selectConfigBreakDuration);
  }

  getConfigState(): ConfigServiceStateType {
    return this.store.select(selectConfigState);
  }
}
