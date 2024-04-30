import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, withLatestFrom } from 'rxjs/operators';
import { CountdownService, TasksService } from '../../services';
import { AppState } from '../../interfaces/app';
import { CountdownActions } from '../countdown';
import { selectCountdownState } from './countdown.selectors';
import { selectTasksState } from '../tasks';

@Injectable()
export class CountdownEffects {
  constructor(
    private actions$: Actions,
    private countdownService: CountdownService,
    private tasksService: TasksService,
    private store: Store<AppState>
  ) {}
  decrementCountdownEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CountdownActions.decrementCountdown),
        withLatestFrom(this.store.select(selectCountdownState)),
        mergeMap(([_, countdown]) => {
          const countdownState = countdown;

          let countdownIsExpired: boolean = countdownState.value <= 0;
          if (countdownIsExpired) {
            if (countdownState.isBreakActive) {
              this.countdownService.stopCountdown();
              this.countdownService.setCountdownBreak(false);
              this.countdownService.setCountdownValue(
                countdownState.startValue
              );
            } else {
              this.countdownService.stopCountdown();
              this.countdownService.setCountdownBreak(true);
              this.countdownService.setCountdownValue(
                countdownState.breakStartValue
              );
            }
          }

          return [_, countdown];
        })
      ),
    { dispatch: false }
  );

  startCountdownEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CountdownActions.startCountdown),
        withLatestFrom(this.store.select(selectTasksState)),
        mergeMap(([_, { tasks }]) => {
          this.countdownService.setCountdownExpired(false);
          this.tasksService.setTaskIsActive(tasks[0].id, true);
          return [_, { tasks }];
        })
      ),
    { dispatch: false }
  );

  stopCountdownEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CountdownActions.stopCountdown),
        withLatestFrom(
          this.store.select(selectTasksState),
          this.store.select(selectCountdownState)
        ),
        mergeMap((state) => {
          const [_, { tasks }, countdown] = state;
          const countdownValueIsZero = countdown.value === 0;
          const currentTask = tasks[0];
          this.tasksService.setTaskIsActive(currentTask.id, false);

          if (
            (countdownValueIsZero && !countdown.isBreakActive) ||
            (countdownValueIsZero && countdown.isBreakActive)
          ) {
            this.countdownService.setCountdownExpired(true);
            this.tasksService.setTaskIsDone(currentTask.id, true);
          }

          return state;
        })
      ),
    { dispatch: false }
  );

  resetCountdownEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CountdownActions.resetCountdown),
        withLatestFrom(this.store.select(selectCountdownState)),
        mergeMap((state) => {
          this.countdownService.setCountdownExpired(false);
          return state;
        })
      ),
    { dispatch: false }
  );

  setCountdownExpiredEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CountdownActions.setCountdownExpired),
        withLatestFrom(this.store.select(selectCountdownState)),
        mergeMap(([_, countdown]) => {
          const alertText = `${
            !countdown.isBreakActive ? 'Pause' : 'Wecker'
          } ist abgelaufen!`;
          setTimeout(() => {
            if (countdown.expired) {
              alert(alertText);
            }
          }, 250);
          return [_, countdown];
        })
      ),
    { dispatch: false }
  );

  setCountdownStartValueAndBreakStartValueEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CountdownActions.setCountdownStartValue,
          CountdownActions.setBreakStartValue
        ),
        withLatestFrom(this.store.select(selectCountdownState)),
        mergeMap(([_, countdown]) => {
          if (!countdown.running) {
            if (countdown.isBreakActive) {
              this.countdownService.setCountdownValue(
                countdown.breakStartValue
              );
            } else {
              this.countdownService.setCountdownValue(countdown.startValue);
            }
          }
          return [_, countdown];
        })
      ),
    { dispatch: false }
  );
}
