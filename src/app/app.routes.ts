import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/events',
    pathMatch: 'full'
  },
  {
    path: 'events',
    loadChildren: () => import('./features/events/events.routes').then(m => m.eventsRoutes)
  },
  {
    path: '**',
    redirectTo: '/events'
  }
];