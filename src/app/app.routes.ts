import { Routes } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { SignupComponent } from './Component/signup/signup.component';

export const routes: Routes = [

    {path: 'login', component:LoginComponent},

    {path:'signup', component:SignupComponent}
];
