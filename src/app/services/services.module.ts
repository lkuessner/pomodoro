import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './ConfigService/config.service';
import { LogService } from './LogsService/logs.service';
import { TasksService } from './TasksService/tasks.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [ConfigService, LogService, TasksService],
})
export class ServicesModule {}
