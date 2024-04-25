import { Routes } from '@angular/router';
import { EinstellungenComponent } from './components/einstellungen/einstellungen.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TimerComponent } from './components/timer/timer.component';
import { LogComponent } from './components/log/log.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Wecker',
    component: TimerComponent,
    // redirectTo: 'wecker',
  },
  {
    title: 'Einstellungen',
    path: 'einstellungen',
    component: EinstellungenComponent,
  },
  {
    title: 'Ereignisse',
    path: 'log',
    component: LogComponent,
  },
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];
