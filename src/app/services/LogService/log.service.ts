import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Log, LogServiceStateType } from '../../interfaces/log';
import { LogActions } from '../../state/log/log.actions';
import { selectLogState } from '../../state/log/log.selectors';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  constructor(private store: Store) {}

  getLogState(): LogServiceStateType {
    return this.store.select(selectLogState);
  }

  addLog(log: Log): void {
    this.store.dispatch(LogActions.addLog({ log }));
  }

  removeLogById(logId: Log['id']) {
    this.store.dispatch(LogActions.removeLogById({ logId }));
  }

  resetLogState(): void {
    this.store.dispatch(LogActions.resetLogState());
  }
}
