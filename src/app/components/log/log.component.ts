import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { formatDate } from '../../functions';
import { LogsService } from '../../services';
import { Subscription } from 'rxjs';
import { LogsState } from '../../interfaces/logs';

type PreparedLog = { date: string; title: string };

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log.component.html',
  styleUrl: './log.component.scss',
})
export class LogComponent {
  logsState!: LogsState['logs'];
  logsSubscription!: Subscription;
  logs: Array<PreparedLog> = [];
  constructor(private logService: LogsService) {
    this.logsSubscription = this.logService
      .getLogsState()
      .subscribe((logsState) => {
        this.logsState = logsState.logs;
      });
    this.logsState
      .filter((log) => log.type !== '@ngrx/effects/init')
      .reverse()
      .forEach((log) => {
        this.logs.push({
          date: formatDate(new Date(log.timestamp)),
          title: log.type,
        });
      });
  }
}
