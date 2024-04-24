import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './ConfigService/config.service';
import { LogService } from './LogService/log.service';
import { TimerService } from './TimerService/timer.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [ConfigService, LogService, TimerService],
})
export class ServicesModule {}
