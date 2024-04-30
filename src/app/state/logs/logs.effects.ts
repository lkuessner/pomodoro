import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { filter, tap } from 'rxjs/operators';
import { v4 } from 'uuid';
import { Log } from '../../interfaces/logs';
import { LogsService } from '../../services/LogsService';
import { CountdownActions } from '../countdown';
import { LogsActions } from './logs.actions';

@Injectable()
export class LogEffects {
  constructor(private actions$: Actions, private logsService: LogsService) {}
  logActionsEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        filter(
          (action) =>
            action.type !== LogsActions.addLog.type &&
            action.type !== LogsActions.resetLogs.type &&
            action.type !== LogsActions.removeLogByID.type &&
            action.type !== CountdownActions.decrementCountdown.type &&
            action.type !== CountdownActions.setCountdownExpired.type
        ),
        tap((actionn) => {
          const log: Log = {
            id: v4(),
            type: actionn.type,
            timestamp: Date.now(),
          };
          this.logsService.addLog(log);
        })
      ),
    { dispatch: false }
  );
}
