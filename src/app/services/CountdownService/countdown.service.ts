import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../interfaces/app/app.state';
import { CountdownActions } from '../../state/countdown/countdown.actions';
import { ICountdownService } from '../../interfaces/countdown/countdown.model';

@Injectable({
  providedIn: 'root',
})
export class CountdownService implements ICountdownService {
  private countdown: number | undefined;

  constructor(private store: Store<AppState>) {}

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

  resetCountdown() {
    clearInterval(this.countdown);
    this.store.dispatch(CountdownActions.resetCountdown());
  }

  setCountdownStartValue(startValue: number) {
    this.store.dispatch(
      CountdownActions.setCountdownStartValue({ startValue })
    );
  }

  setCountdownBreakValue(breakValue: number) {
    this.store.dispatch(
      CountdownActions.setCountdownBreakValue({ breakValue })
    );
  }
}
