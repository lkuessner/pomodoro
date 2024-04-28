import { createReducer, on } from '@ngrx/store';
import { CountdownActions } from './countdown.actions';
import { CountdownState } from '../../interfaces/countdown';
import { Task } from '../../interfaces/tasks';

export const initialState: CountdownState = {
  value: 5,
  startValue: 5,
  breakStartValue: 3,
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
    value: state.startValue,
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
  on(CountdownActions.setBreak, (state, { isBreakActive }) => ({
    ...state,
    isBreakActive,
  })),
  on(CountdownActions.setBreakStartValue, (state, { breakStartValue }) => ({
    ...state,
    breakStartValue,
  }))
);
