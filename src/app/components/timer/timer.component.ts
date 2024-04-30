import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { MatIconButtonSizesModule } from 'mat-icon-button-sizes';
import { Subscription } from 'rxjs';
import { format } from '../../functions';
import { CountdownState } from '../../interfaces/countdown';
import { TasksState } from '../../interfaces/tasks';
import { TasksService } from '../../services';
import { CountdownService } from '../../services/CountdownService';
import { AddEditTaskDialogComponent } from './AddEditTaskDialog/addEditTaskDialog.component';
import { ConfirmDialog } from './ConfirmDialog/confirmDialog.component';

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
  countdownState!: CountdownState;
  countdownSubscription$: Subscription;
  tasksState!: TasksState;
  tasksSubscription$: Subscription;
  isNoTaskDone: boolean = false;

  constructor(
    private countdownService: CountdownService,
    private tasksService: TasksService,
    public dialog: MatDialog
  ) {
    this.countdownSubscription$ = this.countdownService
      .getCountdownState()
      .subscribe((state) => {
        this.countdownState = state;
      });
    this.tasksSubscription$ = this.tasksService
      .getTasksState()
      .subscribe((state) => {
        this.tasksState = state;

        this.isNoTaskDone =
          state.tasks.filter((task) => task.isDone).length === 0;
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
    this.tasksService.resetAllTasksIsActive();
  }

  resetCurrentCountdown() {
    this.countdownService.resetCountdown();
    this.tasksService.setTaskIsActive(this.tasksState.tasks[0].id, false);
  }

  addExampleTasks() {
    this.tasksService.addExmapleData();
  }

  toggleTaskIsDone(taskId: string, taskIsDoneValue: boolean) {
    this.tasksService.setTaskIsDone(taskId, !taskIsDoneValue);
    this.tasksService.setTaskIsActive(taskId, false);
  }

  clearAllTasks() {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: { confirmed: false, prompt: 'Wirklich alle Aufgaben löschen?' },
      height: '120px',
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((answer) => {
      if (answer) {
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
