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
