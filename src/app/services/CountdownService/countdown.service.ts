import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../interfaces/app/app.state';
import { ICountdownService } from '../../interfaces/countdown';
import { CountdownActions } from '../../state/countdown/countdown.actions';
import { selectCountdownState } from '../../state/countdown/countdown.selectors';
import { TaskActions } from '../../state/tasks/tasks.actions';

@Injectable({
  providedIn: 'root',
})
export class CountdownService implements ICountdownService {
  private countdown: number | undefined;
  constructor(private store: Store<AppState>) {}

  getCountdownState() {
    return this.store.select(selectCountdownState);
  }

  startCountdown() {
    this.store.dispatch(CountdownActions.startCountdown());
    this.countdown = setInterval(() => {
      this.store.dispatch(CountdownActions.decrementCountdown());
    }, 1000);
  }

  stopCountdown() {
    clearInterval(this.countdown);
    this.store.dispatch(CountdownActions.stopCountdown());
  }

  setCountdownRunning() {
    this.store.dispatch(CountdownActions.stopCountdown());
  }

  resetCountdown() {
    clearInterval(this.countdown);
    this.store.dispatch(CountdownActions.setBreak({ isBreakActive: false }));
    this.store.dispatch(CountdownActions.resetCountdown());
    this.store.dispatch(
      CountdownActions.setCountdownExpired({ expired: false })
    );
  }

  setCountdownBreak(isBreakActive: boolean) {
    this.store.dispatch(CountdownActions.setBreak({ isBreakActive }));
  }

  setCountdownStartValue(startValue: number) {
    this.store.dispatch(CountdownActions.setStartValue({ startValue }));
  }

  setCountdownValue(value: number) {
    this.store.dispatch(CountdownActions.setCountdownValue({ value }));
  }

  setCountdownBreakStartValue(breakStartValue: number) {
    this.store.dispatch(
      CountdownActions.setBreakStartValue({ breakStartValue })
    );
  }

  setCountdownExpired(expired: boolean) {
    this.store.dispatch(CountdownActions.setCountdownExpired({ expired }));
  }
}
