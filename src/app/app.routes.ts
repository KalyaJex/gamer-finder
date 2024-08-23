import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { EditProfileComponent } from './components/user-profile/edit-profile/edit-profile.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  },
];
