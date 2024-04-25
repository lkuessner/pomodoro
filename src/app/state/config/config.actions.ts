import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ConfigActions = createActionGroup({
  source: 'Config',
  events: {
    UpdateConfigState: props<{ taskDuration: number; breakDuration: number }>(),
    GetConfigState: emptyProps(),
  },
});
