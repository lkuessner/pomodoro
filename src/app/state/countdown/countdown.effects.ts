import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, withLatestFrom } from 'rxjs/operators';
import { CountdownActions } from '../countdown/countdown.actions';
import { CountdownService, TasksService } from '../../services';
import { Store } from '@ngrx/store';
import { AppState } from '../../interfaces/app/app.state';
import { selectCountdownState } from './countdown.selectors';
import { selectTasksState } from '../tasks/tasks.selectors';

@Injectable()
export class CountdownEffects {
  constructor(
    private actions$: Actions,
    private countdownService: CountdownService,
    private tasksService: TasksService,
    private store: Store<AppState>
  ) {}
  decrementCountdownActions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CountdownActions.decrementCountdown),
        withLatestFrom(
          this.store.select(selectCountdownState),
          this.store.select(selectTasksState)
        ),
        mergeMap((state) => {
          const countdown = state[1];

          let countdownIsExpired: boolean = countdown.value <= 0;
          if (countdownIsExpired) {
            if (countdown.isBreakActive) {
              this.countdownService.stopCountdown();
              this.countdownService.setCountdownBreak(false);
              this.countdownService.setCountdownValue(countdown.startValue);
            } else {
              this.countdownService.stopCountdown();
              this.countdownService.setCountdownBreak(true);
              this.countdownService.setCountdownValue(
                countdown.breakStartValue
              );
            }
          }

          return state;
        })
      ),
    { dispatch: false }
  );

  startCountdownActions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CountdownActions.startCountdown),
        withLatestFrom(
          this.store.select(selectTasksState),
          this.store.select(selectCountdownState)
        ),
        mergeMap((state) => {
          this.countdownService.setCountdownExpired(false);
          return state;
        })
      ),
    { dispatch: false }
  );

  stopCountdownActions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CountdownActions.stopCountdown),
        withLatestFrom(
          this.store.select(selectTasksState),
          this.store.select(selectCountdownState)
        ),
        mergeMap((state) => {
          const [_, tasks, countdown] = state;
          const countdownValueIsZero = countdown.value === 0;
          const currentTask = tasks.tasks[0];
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

  resetCountdownActions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CountdownActions.resetCountdown),
        withLatestFrom(this.store.select(selectCountdownState)),
        mergeMap((state) => {
          if (state[1].expired) {
            this.store.dispatch(
              CountdownActions.setCountdownExpired({ expired: false })
            );
          }
          return state;
        })
      ),
    { dispatch: false }
  );
}
