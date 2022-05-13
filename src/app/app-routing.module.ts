import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { HomeComponent } from './home/home.component';
import { ListTicketComponent } from './list-ticket/list-ticket.component';
import { LoginIncorretoComponent } from './login-incorreto/login-incorreto.component';
import { LoginComponent } from './login/login.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent, data: { animationState: 'login' }},
  { path: 'register', component: RegisterComponent, data: { animationState: 'register' }},
  { path: 'forgotpass', component: ForgotpassComponent, data: { animationState: 'forgotpass' }},
  { path: 'list-ticket', component: ListTicketComponent, data: { animationState: 'list-ticket' }},
  { path: 'new-ticket', component: NewTicketComponent, data: { animationState: 'new-ticket' }},
  { path: 'edit-ticket', component: EditTicketComponent, data: { animationState: 'edit-ticket' }},
  { path: 'my-profile', component: HomeComponent, data: { animationState: 'my-profile' }},
  { path: 'login-incorreto', component: LoginIncorretoComponent, data: { animationState: 'login-incorreto' }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
