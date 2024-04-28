import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Log } from '../../interfaces/logs';

export const LogsActions = createActionGroup({
  source: 'Logs',
  events: {
    'Get Logs state': emptyProps(),
    'Add Log': props<{ log: Log }>(),
    'Remove Log by ID': props<{ logId: Log['id'] }>(),
    'Reset Log state': emptyProps(),
  },
});
