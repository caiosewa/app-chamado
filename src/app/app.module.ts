import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { MaterialModule } from './material/material.module';
import { MatSelectModule } from '@angular/material/select';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { ListTicketComponent } from './list-ticket/list-ticket.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ForgotpassComponent,
    ListTicketComponent,
    NewTicketComponent,
    EditTicketComponent,
    NavbarComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSelectModule,
  ],
  providers: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
