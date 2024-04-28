import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Log, ILogsService } from '../../interfaces/logs';
import { LogsActions } from '../../state/logs/logs.actions';
import { selectLogsState } from '../../state/logs/logs.selectors';
import { LogsState } from '../../interfaces/logs/logs.model';
import { Observable } from 'rxjs';
import { AppState } from '../../interfaces/app/app.state';

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
    this.store.dispatch(LogsActions.resetLogState());
  }
}
