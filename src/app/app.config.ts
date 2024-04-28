import { ApplicationConfig } from '@angular/core';
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

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({
      config: configReducer,
      countdown: countdownReducer,
      logs: logsReducer,
      tasks: tasksReducer,
    }),
    provideEffects(LogEffects),
    provideAnimationsAsync(),
  ],
};
