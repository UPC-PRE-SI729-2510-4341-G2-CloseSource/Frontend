import { Routes } from '@angular/router';
import { ProposalListComponent } from './proposals/components/proposal-list/proposal-list.component'

export const routes: Routes = [
  { path: '', redirectTo: '/proposals', pathMatch: 'full' }, // Ruta por defecto
  { path: 'proposals', component: ProposalListComponent }, // Ruta para propuestas enviadas
  { path: 'pending-requests', component: ProposalListComponent }, // Para solicitudes pendientes
  { path: 'upcoming-events', component: ProposalListComponent }, // Para próximos eventos

  ];
