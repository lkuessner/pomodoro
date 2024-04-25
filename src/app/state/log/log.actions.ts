import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Log } from '../../interfaces/log';

export const LogActions = createActionGroup({
  source: 'Log',
  events: {
    AddLog: props<{ log: Log }>(),
    RemoveLogById: props<{ logId: string }>(),
    resetLogState: emptyProps(),
  },
});
