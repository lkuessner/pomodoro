import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CountdownActions = createActionGroup({
  source: 'Countdown',
  events: {
    startCountdown: emptyProps(),
    stopCountdown: emptyProps(),
    resetCountdown: emptyProps(),
    decrementCountdown: emptyProps(),
    setCountdownStartValue: props<{ startValue: number }>(),
    setCountdownBreakValue: props<{ breakValue: number }>(),
  },
});
