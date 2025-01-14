import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from '../components/views/todo-list/todo-list.component';
import { NavComponent } from './modules/navigation/nav/nav.component';
import { CounterComponent } from '../components/views/counter/counter.component';
import { FooterComponent } from '../components/footer/footer.component';
import { RegisterComponent } from './modules/authentificator/register/register.component';
import { LoginComponent } from './modules/authentificator/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './modules/authentificator/auth-guard/auth-guard.component';
import { ProfilComponent } from '../components/profil/profil.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { BookListComponent } from '../components/views/book-list/book-list.component';
import { SubNavbarComponent } from './modules/navigation/sub-navbar/sub-navbar.component';
import { DataPostComponent } from './data/data-post/data-post.component';
import { DataGetComponent } from './data/data-get/data-get.component'; 
import { HttpClientModule } from '@angular/common/http';
import { TodoComponent } from './data/todo/todo.component';
import { SearchComponent } from './search/search.component';
import { CalendarComponent } from '../components/views/calendar/calendar.component';

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
    NotFoundComponent,
    BookListComponent,
    SubNavbarComponent,
    DataPostComponent,
    DataGetComponent,
    TodoComponent,
    SearchComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    FormsModule,
    HttpClientModule,
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


