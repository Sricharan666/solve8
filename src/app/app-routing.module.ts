import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path : 'signup' , component : SignupComponent},
  {path : 'login', component : LoginComponent},
  {path : 'dashboard', component : DashboardComponent},
  { path: '', redirectTo: 'signup', pathMatch: 'full' }, // Default path redirect to signup
  { path: '**', redirectTo: 'signup' } // Wildcard path to redirect any unknown paths to signup
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
