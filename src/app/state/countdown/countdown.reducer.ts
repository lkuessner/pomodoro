import { createReducer, on } from '@ngrx/store';
import { CountdownActions } from './countdown.actions';
import { CountdownState } from '../../interfaces/countdown';

export const initialState: CountdownState = {
  value: 25,
  startValue: 25,
  breakStartValue: 5,
  running: false,
  isBreakActive: false,
  expired: false,
};

export const countdownReducer = createReducer(
  initialState,
  on(CountdownActions.startCountdown, (state) => ({ ...state, running: true })),
  on(CountdownActions.stopCountdown, (state) => ({ ...state, running: false })),
  on(CountdownActions.resetCountdown, (state) => ({
    ...state,
    value: state.isBreakActive ? state.breakStartValue : state.startValue,
  })),
  on(CountdownActions.decrementCountdown, (state) => ({
    ...state,
    value: state.value - 1,
  })),
  on(CountdownActions.setStartValue, (state, { startValue }) => ({
    ...state,
    startValue,
  })),
  on(CountdownActions.setCountdownValue, (state, { value }) => ({
    ...state,
    value,
  })),
  on(CountdownActions.setCountdownExpired, (state, { expired }) => ({
    ...state,
    expired,
  })),
  on(CountdownActions.setBreakIsActive, (state, { isBreakActive }) => ({
    ...state,
    isBreakActive,
  })),
  on(CountdownActions.setBreakStartValue, (state, { breakStartValue }) => ({
    ...state,
    breakStartValue,
  }))
);
