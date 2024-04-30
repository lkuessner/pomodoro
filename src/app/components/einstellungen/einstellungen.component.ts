import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatIconButtonSizesModule } from 'mat-icon-button-sizes';
import { Subscription } from 'rxjs';
import { minutesToSeconds, secondsToMinutes } from '../../functions';
import { CountdownService } from '../../services/CountdownService';
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

const formFieldValidators = [
  Validators.required,
  Validators.min(0.1),
  Validators.pattern(/^\d*[.,]?\d{0,1}$/),
];

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
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatIconButtonSizesModule,
  ],
  templateUrl: './einstellungen.component.html',
  styleUrl: './einstellungen.component.scss',
})
export class EinstellungenComponent implements OnDestroy {
  countdownSubscription$: Subscription;
  formGroup: FormGroup<SettingsForm> = this.formBuilder.group({
    startValue: new FormControl(0, formFieldValidators),
    breakStartValue: new FormControl(0, formFieldValidators),
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
          startValue: Number(secondsToMinutes(state.startValue).toFixed(1)),
          breakStartValue: Number(
            secondsToMinutes(state.breakStartValue).toFixed(1)
          ),
        });
      });
    this.countdownSubscription$.unsubscribe();
  }

  ngOnDestroy(): void {
    this.countdownSubscription$.unsubscribe();
  }

  resetSettingsToInitial() {
    this.countdownService.resetCountdownToInitialState();
    const resubscribe$ = this.countdownService
      .getCountdownState()
      .subscribe((state) => {
        this.formGroup.setValue({
          startValue: Number(secondsToMinutes(state.startValue).toFixed(1)),
          breakStartValue: Number(
            secondsToMinutes(state.breakStartValue).toFixed(1)
          ),
        });
      });
    resubscribe$.unsubscribe();
  }

  onSubmit() {
    if (
      this.formGroup.value.startValue &&
      this.formGroup.value.breakStartValue
    ) {
      this.countdownService.setCountdownStartValue(
        minutesToSeconds(this.formGroup.value.startValue)
      );
      this.countdownService.setCountdownBreakStartValue(
        minutesToSeconds(this.formGroup.value.breakStartValue)
      );
    }
  }
}
