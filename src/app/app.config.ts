import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { configReducer } from './state/config/config.reducer';
import { logReducer } from './state/log/log.reducer';
import { provideEffects } from '@ngrx/effects';
import { LogEffects } from './state/log/log.effects';
import { timerReducer } from './state/timer/timer.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({
      config: configReducer,
      logs: logReducer,
      timers: timerReducer,
    }),
    provideEffects(LogEffects),
  ],
};
