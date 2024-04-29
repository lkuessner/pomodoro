import { Component } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { CountdownService } from '../../services/CountdownService/countdown.service';
import { CountdownState } from '../../interfaces/countdown';
export class SettingsErrorStateMatcher implements ErrorStateMatcher {
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

interface SettingsForm {
  startValue: FormControl<number | null>;
  breakStartValue: FormControl<number | null>;
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
export class EinstellungenComponent {
  countdown!: CountdownState;
  countdownSubscription$: Subscription;
  formGroup: FormGroup<SettingsForm> = this.formBuilder.group({
    startValue: new FormControl(0, [Validators.required]),
    breakStartValue: new FormControl(0, [Validators.required]),
  });
  matcher = new SettingsErrorStateMatcher();
  constructor(
    private formBuilder: FormBuilder,
    private countdownService: CountdownService
  ) {
    this.countdownSubscription$ = this.countdownService
      .getCountdownState()
      .subscribe((state) => {
        this.formGroup.setValue({
          startValue: state.startValue,
          breakStartValue: state.breakStartValue,
        });
        this.countdown = state;
      });
    this.countdownSubscription$.unsubscribe();
  }

  onSubmit() {
    if (
      this.formGroup.value['startValue'] &&
      this.formGroup.value['breakStartValue']
    ) {
      if (this.formGroup.controls.breakStartValue.dirty) {
        this.countdownService.setCountdownBreakStartValue(
          minutesToSeconds(this.formGroup.value['breakStartValue'])
        );
      }
      if (this.formGroup.controls.startValue.dirty) {
        this.countdownService.setCountdownStartValue(
          minutesToSeconds(this.formGroup.value['startValue'])
        );
      }
    }
  }
}
