import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services';
import { CommonModule } from '@angular/common';
import { formatDate } from '../../functions';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log.component.html',
  styleUrl: './log.component.scss',
})
export class LogComponent implements OnInit {
  logArray: Array<any> = [];

  constructor(private logService: LogService) {}
  ngOnInit(): void {
    this.logService.getLogState().subscribe((logState) => {
      logState
        .filter((log) => log.type !== '@ngrx/effects/init')
        .forEach((log) => {
          this.logArray.push({
            date: formatDate(new Date(log.timestamp)),
            title: log.type,
          });
        });
      console.log(this.logArray);
    });
  }
}
