import { createReducer, on } from '@ngrx/store';
import { CountdownActions } from './countdown.actions';
import { CountdownState } from '../../interfaces/countdown';

export const initialState: CountdownState = {
  value: 60,
  startValue: 60,
  running: false,
  break: false,
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
  on(CountdownActions.setCountdownStartValue, (state, { startValue }) => ({
    ...state,
    startValue,
  }))
);
