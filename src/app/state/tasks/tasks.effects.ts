import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../../interfaces/app';
import { CountdownService, TasksService } from '../../services';
import { selectCountdownState } from '../countdown';
import { TasksActions, selectTasksState } from '../tasks';

@Injectable()
export class TasksEffects {
  constructor(
    private actions$: Actions,
    private countdownService: CountdownService,
    private tasksService: TasksService,
    private store: Store<AppState>
  ) {}

  setTaskIsDoneEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TasksActions.setTaskIsDone),
        withLatestFrom(
          this.store.select(selectTasksState),
          this.store.select(selectCountdownState)
        ),
        mergeMap(([_, { tasks }, countdown]) => {
          const areAllTasksDone = !tasks
            .map((task) => task.isDone)
            .includes(false);
          if (countdown.running) {
            this.tasksService.setTaskIsActive(tasks[0].id, true);
          }

          if (areAllTasksDone) {
            this.tasksService.setIsAllTasksDone(true);
            this.countdownService.stopCountdown();
            this.countdownService.resetCountdown();
          } else {
            this.tasksService.setIsAllTasksDone(false);
          }
          return [_, { tasks }];
        })
      ),
    { dispatch: false }
  );

  removeTaskEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TasksActions.removeTask),
        withLatestFrom(this.store.select(selectTasksState)),
        mergeMap(([_, { tasks }]) => {
          const areAllTasksDone = !tasks
            .map((task) => task.isDone)
            .includes(false);

          if (areAllTasksDone) {
            this.tasksService.setIsAllTasksDone(true);
            this.countdownService.stopCountdown();
            this.countdownService.resetCountdown();
          } else {
            this.tasksService.setIsAllTasksDone(false);
          }
          return [_, { tasks }];
        })
      ),
    { dispatch: false }
  );

  clearAllTasksEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TasksActions.clearAllTasks),
        withLatestFrom(this.store.select(selectTasksState)),
        mergeMap(([_, { tasks }]) => {
          this.tasksService.resetAllTasksIsDone();

          return [_, { tasks }];
        })
      ),
    { dispatch: false }
  );
}
