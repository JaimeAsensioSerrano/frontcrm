
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/componets/signup/signup.component';
import { LoginComponent } from './auth/componets/login/login.component';

export const routes: Routes = [
    { path: 'register', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
    { path: 'customer', loadChildren: () => import('./modules/clienten/clienten.module').then(m => m.ClientenModule) },
];
