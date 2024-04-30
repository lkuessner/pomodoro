import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddEditDialogData } from './types';

@Component({
  selector: 'app-add-edit-task-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './addEditTaskDialog.component.html',
  styleUrl: './addEditTaskDialog.component.scss',
})
export class AddEditTaskDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddEditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddEditDialogData
  ) {}
  prompt: string = 'Wie lautet die Aufgabe?';

  onNoClick(): void {
    if (this.data !== undefined) {
      this.dialogRef.close(this.data.dialogTaskTitle);
    } else {
      this.dialogRef.close();
    }
  }
}
