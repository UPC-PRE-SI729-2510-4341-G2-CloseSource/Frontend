import { Routes } from '@angular/router';
import { HomeComponent } from "./public/pages/home/home.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import {authenticationGuard} from "./iam/services/authentication.guard";
import {SignInComponent} from "./iam/pages/sign-in/sign-in.component";
import {SignUpComponent} from "./iam/pages/sign-up/sign-up.component";
import {ProposalListComponent} from './proposals/components/proposal-list/proposal-list.component';
import { AvailableRequestsPageComponent } from './request/pages/available-requests-page/available-requests-page.component';
import { ActivationRequestCreatePageComponent } from './request/pages/activation-request-create-page/activation-request-create-page.component';
import { ActivationRequestDetailPageComponent } from './request/pages/activation-request-detail-page/activation-request-detail-page.component';
export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent},
  { path: 'requests', component: AvailableRequestsPageComponent,canActivate: [authenticationGuard]  },
  { path: 'requests/create', component: ActivationRequestCreatePageComponent, canActivate: [authenticationGuard] },
  { path: 'requests/:id', component: ActivationRequestDetailPageComponent, canActivate: [authenticationGuard] },
  { path: 'proposal', component: ProposalListComponent, canActivate: [authenticationGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
