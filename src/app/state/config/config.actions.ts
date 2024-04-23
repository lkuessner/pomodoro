import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ConfigActions = createActionGroup({
  source: 'Config',
  events: {
    UpdateTaskDuration: props<{ taskDuration: number }>(),
    UpdateBreakDuration: props<{ breakDuration: number }>(),
    GetConfigState: emptyProps(),
  },
});
