import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'prefix',
  },
  {
    path: 'login',
    component: LoginComponent,
  }
];
