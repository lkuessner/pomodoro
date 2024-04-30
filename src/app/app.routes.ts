import { Routes } from '@angular/router';
import { EinstellungenComponent } from './components/einstellungen/einstellungen.component';
import { LogComponent } from './components/log/log.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TimerComponent } from './components/timer/timer.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Wecker',
    component: TimerComponent,
  },
  {
    title: 'Ereignisse',
    path: 'log',
    component: LogComponent,
  },
  {
    title: 'Einstellungen',
    path: 'einstellungen',
    component: EinstellungenComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];
