import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../interfaces/app';
import { ICountdownService } from '../../interfaces/countdown';
import { CountdownActions, selectCountdownState } from '../../state/countdown';

@Injectable({
  providedIn: 'root',
})
export class CountdownService implements ICountdownService {
  private countdown: number | undefined;
  constructor(private store: Store<AppState>) {}

  returnInterval() {
    return setInterval(() => {
      this.store.dispatch(CountdownActions.decrementCountdown());
    }, 1000);
  }

  getCountdownState() {
    return this.store.select(selectCountdownState);
  }

  startCountdown() {
    this.store.dispatch(CountdownActions.startCountdown());
    this.countdown = this.returnInterval();
  }

  stopCountdown() {
    clearInterval(this.countdown);
    this.store.dispatch(CountdownActions.stopCountdown());
  }

  setCountdownRunning() {
    if (this.countdown === undefined) {
      this.countdown = this.returnInterval();
    }
  }

  resetCountdown() {
    clearInterval(this.countdown);
    this.store.dispatch(CountdownActions.resetCountdown());
  }

  resetCountdownToInitialState() {
    this.store.dispatch(CountdownActions.resetCountdownToInitialState());
  }

  setCountdownBreak(isBreakActive: boolean) {
    this.store.dispatch(CountdownActions.setBreakIsActive({ isBreakActive }));
  }

  setCountdownStartValue(startValue: number) {
    this.store.dispatch(
      CountdownActions.setCountdownStartValue({ startValue })
    );
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
