import { Routes } from '@angular/router';
import { HomeComponent } from "./public/pages/home/home.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import { MilestoneManagementComponent} from './activationManagement/pages/milestone-management/milestone-management.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'activationManagement/milestones', component: MilestoneManagementComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
