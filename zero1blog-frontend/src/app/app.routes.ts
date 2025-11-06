import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'User Login',
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'User Sign Up',
  },
  {
    path: '',
    component: HomeComponent,
    title: 'home',
  },
];
