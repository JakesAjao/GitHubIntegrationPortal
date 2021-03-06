import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';

export const AppRoutes: Routes = [
  
  { path: 'login', component: LoginComponent },
  
  { path: '', component: AdminLayoutComponent, canActivate: [AuthGuard] },
  {
    path: '',
    redirectTo: 'dashboard',//'dashboard'
    pathMatch: 'full',
  }, 
  {
    path: '', component: AdminLayoutComponent, children: [{
    path: '',loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule', canActivate: [AuthGuard] 
  }]},
   {
     //Otherwise redirect to home
     path: '**',
     redirectTo: 'dashboard'//'dashboard'
   },
  
]
