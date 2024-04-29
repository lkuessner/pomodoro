import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CountdownState } from '../../interfaces/countdown';

export const CountdownActions = createActionGroup({
  source: 'Countdown',
  events: {
    'Start Countdown': emptyProps(),
    'Stop Countdown': emptyProps(),
    'Reset Countdown': emptyProps(),
    'Decrement Countdown': emptyProps(),
    'Set Running': props<{ running: CountdownState['running'] }>(),
    'Set Countdown value': props<{ value: CountdownState['value'] }>(),
    'Set start value': props<{ startValue: CountdownState['startValue'] }>(),
    'Set break start value': props<{
      breakStartValue: CountdownState['breakStartValue'];
    }>(),
    'Set break is active': props<{
      isBreakActive: CountdownState['isBreakActive'];
    }>(),
    'Set Countdown expired': props<{ expired: CountdownState['expired'] }>(),
  },
});
