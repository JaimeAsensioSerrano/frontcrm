
import { Routes } from '@angular/router';
import { SignupComponent } from './auth/componets/signup/signup.component';
import { LoginComponent } from './auth/componets/login/login.component';

export const routes: Routes = [
    { path: 'register', component: SignupComponent },
    { path: 'login', component: LoginComponent }
];
