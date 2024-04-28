import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { minutesToSeconds, secondsToMinutes } from '../../functions';
import { Subscription, take } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { CountdownService } from '../../services/CountdownService/countdown.service';
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
    MatButton,
    ReactiveFormsModule,
  ],
  templateUrl: './einstellungen.component.html',
  styleUrl: './einstellungen.component.scss',
})
export class EinstellungenComponent implements OnInit, OnDestroy {
  taskDuration: number = 0;
  formGroup: FormGroup = this.formBuilder.group({
    taskDuration: new FormControl(undefined, [Validators.required]),
    breakDuration: new FormControl(undefined, [Validators.required]),
  });
  getConfigStateSub!: Subscription;
  matcher = new MyErrorStateMatcher();
  constructor(
    private formBuilder: FormBuilder,
    private countdownService: CountdownService
  ) {}

  ngOnInit() {}

  ngOnDestroy(): void {
    this.getConfigStateSub.unsubscribe();
  }

  onSubmit() {
    this.countdownService.setCountdownBreakValue(
      minutesToSeconds(this.formGroup.value['breakDuration'])
    );
  }
}
