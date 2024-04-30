import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButtonSizesModule } from 'mat-icon-button-sizes';
import { Subscription } from 'rxjs';
import { formatDate } from '../../functions';
import { LogsService } from '../../services';

type PreparedLog = { date: string; title: string };

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatIconButtonSizesModule,
  ],
  templateUrl: './log.component.html',
  styleUrl: './log.component.scss',
})
export class LogComponent {
  logsSubscription!: Subscription;
  logs: Array<PreparedLog> = [];
  constructor(private logService: LogsService) {
    this.logsSubscription = this.logService
      .getLogsState()
      .subscribe((logsState) => {
        this.logs = logsState.logs
          .filter((log) => log.type !== '@ngrx/effects/init')
          .reverse()
          .map((log) => {
            return {
              date: formatDate(new Date(log.timestamp)),
              title: log.type,
            };
          });
      });
  }

  resetLogs() {
    this.logService.resetLogs();
  }
}
