import { Component, OnInit } from '@angular/core';
import { Config } from '../../interfaces/config';
import { ConfigService } from '../../services';

@Component({
  selector: 'app-einstellungen',
  standalone: true,
  imports: [],
  templateUrl: './einstellungen.component.html',
  styleUrl: './einstellungen.component.scss',
})
export class EinstellungenComponent {
  taskDuration: Config['taskDuration'] = 0;
  breakDuration: Config['taskDuration'] = 0;

  constructor(private configService: ConfigService) {
    this.configService.getConfigState().subscribe((state) => {
      this.taskDuration = state.taskDuration;
      this.breakDuration = state.breakDuration;
    });
  }

  handleTaskDurationChange(event: Event) {
    const newValue = Number((event.target as HTMLInputElement).value);
    this.taskDuration = newValue;
  }

  handleBreakDurationChange(event: Event) {
    const newValue = Number((event.target as HTMLInputElement).value);
    this.breakDuration = newValue;
  }
}
