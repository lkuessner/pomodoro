import { createReducer, on } from '@ngrx/store';
import { CountdownActions } from './countdown.actions';
import { CountdownState } from '../../interfaces/countdown';

export const initialStateObject: CountdownState = {
  value: 1500,
  startValue: 1500,
  breakStartValue: 300,
  running: false,
  isBreakActive: false,
  expired: false,
};

export const initialState: CountdownState = {
  value: 1500,
  startValue: 1500,
  breakStartValue: 300,
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
  on(CountdownActions.resetCountdownToInitialState, (state) => ({
    ...state,
    startValue: initialStateObject.startValue,
    breakStartValue: initialStateObject.breakStartValue,
  })),
  on(CountdownActions.decrementCountdown, (state) => ({
    ...state,
    value: state.value - 1,
  })),
  on(CountdownActions.setCountdownStartValue, (state, { startValue }) => ({
    ...state,
    startValue,
  })),
  on(CountdownActions.setBreakStartValue, (state, { breakStartValue }) => ({
    ...state,
    breakStartValue,
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
  }))
);
