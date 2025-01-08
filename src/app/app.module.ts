import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from '../components/todo-list/todo-list.component';
import { NavComponent } from '../components/nav/nav.component';
import { CounterComponent } from '../components/counter/counter.component';
import { FooterComponent } from '../components/footer/footer.component';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../components/auth-guard/auth-guard.component';
import { ProfilComponent } from '../components/profil/profil.component'; 

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    NavComponent,
    CounterComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    ProfilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot({
      positionClass: 'toast-top-center', 
      timeOut: 3000, 
      preventDuplicates: true 
    }),   
  ],
  providers: [AuthGuard], 
  bootstrap: [AppComponent]
})
export class AppModule { }


