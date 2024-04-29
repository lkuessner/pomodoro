import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatIconButtonSizesModule } from 'mat-icon-button-sizes';
import { Subscription } from 'rxjs';
import { AddEditTaskDialogComponent } from './AddEditTaskDialog/addEditTaskDialog.component';
import { ConfirmDialog } from './ConfirmDialog/confirmDialog.component';
import { Task } from '../../interfaces/tasks';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CountdownService } from '../../services/CountdownService/countdown.service';
import { TasksState } from '../../interfaces/tasks';
import { CountdownState } from '../../interfaces/countdown';
import { TasksService } from '../../services';
import { format } from '../../functions';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatIconButtonSizesModule,
    MatCardModule,
    RouterModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class TimerComponent {
  countdown!: CountdownState;
  countdownSubscription$: Subscription;
  tasks!: TasksState;
  tasksArray!: TasksState['tasks'];
  tasksSubscription$: Subscription;
  allTasksDone: boolean = false;
  currentTask: Task | undefined;
  constructor(
    private countdownService: CountdownService,
    private tasksService: TasksService,
    public dialog: MatDialog
  ) {
    this.countdownSubscription$ = this.countdownService
      .getCountdownState()
      .subscribe((state) => {
        this.countdown = state;
      });
    this.tasksSubscription$ = this.tasksService
      .getTasksState()
      .subscribe((state) => {
        this.tasks = state;
        this.tasksArray = state.tasks;
        this.allTasksDone = !state.tasks
          .map((task) => task.isDone)
          .includes(false);
      });
  }

  formatTimerDuration(timeInSeconds: number): string {
    return format(timeInSeconds);
  }

  startCountdown() {
    this.countdownService.startCountdown();
  }

  stopCountdown() {
    this.countdownService.stopCountdown();
  }

  resetCountdownAndTasks() {
    this.countdownService.resetCountdown();
    this.countdownService.setCountdownBreak(false);
    this.tasksService.resetAllTasksIsDone();
  }

  resetCurrentCountdown() {
    this.countdownService.resetCountdown();
  }

  addExampleTasks() {
    this.tasksService.addExmapleData();
  }

  toggleTaskIsDone(taskId: string, taskIsDoneValue: boolean) {
    this.tasksService.setTaskIsDone(taskId, !taskIsDoneValue);
  }

  resetCurrentTimer() {
    this.countdownService.resetCountdown();
  }

  clearAllTasks() {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: { confirmed: false, prompt: 'Wirklich alle Aufgaben löschen?' },
      height: '120px',
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tasksService.clearAllTasks();
      }
    });
  }

  deleteTaskDialog(taskId: string) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: { confirmed: false, prompt: 'Aufgabe wirklich löschen?' },
      height: '120px',
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tasksService.removeTask(taskId);
      }
    });
  }
  editTaskDialog(taskTitle: string, taskId: string) {
    const dialogRef = this.dialog.open(AddEditTaskDialogComponent, {
      data: { dialogTaskTitle: taskTitle },
      height: '220px',
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.dialogTaskTitle !== undefined)
        this.tasksService.setTaskTitle(taskId, result.dialogTaskTitle);
    });
  }
  addTaskDialog(): void {
    const dialogRef = this.dialog.open(AddEditTaskDialogComponent, {
      data: { dialogTaskTitle: '' },
      height: '220px',
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.dialogTaskTitle !== undefined) {
        this.tasksService.addTask(result.dialogTaskTitle);
      }
    });
  }
}
