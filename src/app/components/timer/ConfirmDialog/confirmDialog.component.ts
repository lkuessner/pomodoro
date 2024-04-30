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
import { ConfirmDialogData } from './types';

@Component({
  selector: 'app-confirm-dialog',
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
  templateUrl: './confirmDialog.component.html',
  styleUrl: './confirmDialog.component.scss',
})
export class ConfirmDialog {
  prompt?: string = 'Bist du sicher?';
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {
    this.prompt = data.prompt;
  }

  onNoClick(): void {
    if (this.data !== undefined) {
      this.dialogRef.close(this.data.confirmed);
    } else {
      this.dialogRef.close();
    }
  }
}
