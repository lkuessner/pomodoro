import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { filter, tap } from 'rxjs/operators';
import { LogService } from '../../services/LogService/log.service';
import { Log } from '../../interfaces/log';
import { uuidv4 } from '../../functions';
import { LogActions } from './log.actions';

@Injectable()
export class LogEffects {
  constructor(private actions$: Actions, private logService: LogService) {}
  logActions$ = createEffect(
    () =>
      this.actions$.pipe(
        filter(
          (action) =>
            action.type !== LogActions.addLog.type &&
            action.type !== LogActions.resetLogState.type &&
            action.type !== LogActions.removeLogById.type
        ),
        tap((actionn) => {
          const log: Log = {
            id: uuidv4(),
            type: actionn.type,
            timestamp: Date.now(),
          };
          this.logService.addLog(log);
        })
      ),
    { dispatch: false } // Prevent this effect from dispatching new actions
  );
}