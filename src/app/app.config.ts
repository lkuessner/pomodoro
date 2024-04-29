import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { LogEffects } from './state/logs/logs.effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { countdownReducer } from './state/countdown/countdown.reducer';
import { tasksReducer } from './state/tasks/tasks.reducer';
import { logsReducer } from './state/logs/logs.reducer';
import { configReducer } from './state/config/config.reducer';
import { metaReducers } from './state';
import { CountdownEffects } from './state/countdown/countdown.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(
      {
        config: configReducer,
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
    provideEffects(CountdownEffects, LogEffects),
    provideAnimationsAsync(),
  ],
};
