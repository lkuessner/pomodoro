import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Log } from '../../interfaces/logs';

export const LogsActions = createActionGroup({
  source: 'Logs',
  events: {
    AddLog: props<{ log: Log }>(),
    RemoveLogById: props<{ logId: Log['id'] }>(),
    resetLogState: emptyProps(),
  },
});
