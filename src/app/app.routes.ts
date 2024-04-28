import { Routes } from '@angular/router';
import { EinstellungenComponent } from './components/einstellungen/einstellungen.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TimerComponent } from './components/timer/timer.component';
import { LogComponent } from './components/log/log.component';
import { TestComponent } from './components/test/test.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Wecker',
    component: TimerComponent,
  },
  {
    path: 'test',
    title: 'Test',
    component: TestComponent,
  },
  // {
  //   title: 'Einstellungen',
  //   path: 'einstellungen',
  //   component: EinstellungenComponent,
  // },
  // {
  //   title: 'Ereignisse',
  //   path: 'log',
  //   component: LogComponent,
  // },
  { path: '**', component: PageNotFoundComponent },
];
