import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-einstellungen',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './einstellungen.component.html',
  styleUrl: './einstellungen.component.scss',
})
export class EinstellungenComponent {
  formGroup: FormGroup = this.formBuilder.group({
    taskDuration: new FormControl(0, [Validators.required]),
    breakDuration: new FormControl(0, [Validators.required]),
  });

  matcher = new MyErrorStateMatcher();
  constructor(
    private configService: ConfigService,
    private formBuilder: FormBuilder
  ) {
    this.configService.getConfigState().subscribe((state) => {
      this.formGroup.setValue({
        taskDuration: state.taskDuration,
        breakDuration: state.breakDuration,
      });
    });
  }

  onSubmit() {
    this.configService.updateConfigState(this.formGroup.value);
  }
}
