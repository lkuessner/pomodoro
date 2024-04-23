import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfigServiceStateType } from '../../interfaces/config';
import { ConfigActions } from '../../state/config/config.actions';

@Injectable({
  providedIn: 'root',
})
export class GlobalConfigService implements OnInit {
  config$: ConfigServiceStateType | undefined = undefined;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(ConfigActions.getConfigState());
  }

  setTaskDuration = (durationValue: number) => {
    console.log(durationValue);
  };

  getTaskDuration = () => {};

  setBreakDuration = (durationValue: number) => {
    console.log(durationValue);
  };

  getBreakDuration = () => {};
}
