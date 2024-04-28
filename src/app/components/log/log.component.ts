import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { formatDate } from '../../functions';
import { AppState } from '../../interfaces/app/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log.component.html',
  styleUrl: './log.component.scss',
})
export class LogComponent implements OnInit {
  logs: Array<any> = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select('logs').subscribe((logsState) => {
      logsState.logs
        .filter((log) => log.type !== '@ngrx/effects/init')
        .forEach((log) => {
          this.logs.push({
            date: formatDate(new Date(log.timestamp)),
            title: log.type,
          });
        });
    });
  }
}
