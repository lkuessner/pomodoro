import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CountdownState } from '../../interfaces/countdown';

export const selectCountdown =
  createFeatureSelector<CountdownState>('countdown');

export const selectCountdownState = createSelector(
  selectCountdown,
  (countdown) => {
    return countdown;
  }
);

export const selectCountdownStartValue = createSelector(
  selectCountdown,
  (countdown) => {
    return countdown.startValue;
  }
);

export const selectCountdownRunning = createSelector(
  selectCountdown,
  (countdown) => {
    return countdown.running;
  }
);

export const selectCountdownBreakStartValue = createSelector(
  selectCountdown,
  (countdown) => {
    return countdown.breakStartValue;
  }
);
