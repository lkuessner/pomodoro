import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfigActions } from './state/config/config.actions';
import { ConfigService } from './services/ConfigService/config.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'pomodoro';
  inputValue: number = 25;
  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    console.log('app component onInit', this.configService.getConfig());
  }

  getConfig() {
    this.configService
      .getConfig()
      .subscribe((data) => console.log('getConfig', data));
  }

  getTaskDuration() {
    this.configService
      .getTaskDuration()
      .subscribe((data) => console.log('getTaskDuration', data));
  }

  getBreakDuration() {
    this.configService
      .getBreakDuration()
      .subscribe((data) => console.log('getBreakDuration', data));
  }

  setBreakDuration() {
    this.configService.setTaskDuration(this.inputValue);
  }

  displayInputValue() {
    console.log(this.inputValue);
  }

  handleInputChange(event: Event) {
    const newValue = Number((event.target as HTMLInputElement).value);
    this.inputValue = newValue;
  }
}
