import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { metaReducers } from './state';
import { CountdownEffects } from './state/countdown/countdown.effects';
import { countdownReducer } from './state/countdown/countdown.reducer';
import { LogEffects } from './state/logs/logs.effects';
import { logsReducer } from './state/logs/logs.reducer';
import { TasksEffects } from './state/tasks/tasks.effects';
import { tasksReducer } from './state/tasks/tasks.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(
      {
        countdown: countdownReducer,
        logs: logsReducer,
        tasks: tasksReducer,
      },
      { metaReducers: metaReducers }
    ),
    provideStoreDevtools({
      connectInZone: true,
      logOnly: isDevMode(),
    }),
    provideEffects(CountdownEffects, LogEffects, TasksEffects),
    provideAnimationsAsync(),
  ],
};
