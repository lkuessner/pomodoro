import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../interfaces/app/app.state';
import { ILogsService, Log } from '../../interfaces/logs';
import { LogsActions } from '../../state/logs/logs.actions';
import { selectLogsState } from '../../state/logs/logs.selectors';

@Injectable({
  providedIn: 'root',
})
export class LogsService implements ILogsService {
  constructor(private store: Store<AppState>) {}

  getLogsState() {
    return this.store.select(selectLogsState);
  }
  addLog(log: Log): void {
    this.store.dispatch(LogsActions.addLog({ log }));
  }

  removeLog(logId: Log['id']) {
    this.store.dispatch(LogsActions.removeLogByID({ logId }));
  }

  resetLogs() {
    this.store.dispatch(LogsActions.resetLogs());
  }
}
