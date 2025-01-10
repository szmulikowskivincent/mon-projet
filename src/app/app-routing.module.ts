import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from '../components/views/counter/counter.component';
import { TodoListComponent } from '../components/views/todo-list/todo-list.component';
import { LoginComponent } from 'src/app/modules/authentificator/login/login.component';
import { RegisterComponent } from 'src/app/modules/authentificator/register/register.component';
import { ProfilComponent } from 'src/components/profil/profil.component';
import { AuthGuard } from './modules/authentificator/auth-guard/auth-guard.component';
import { NotFoundComponent } from '../components/not-found/not-found.component'; 
import { BookListComponent } from '../components/views/book-list/book-list.component';
import { DataPostComponent } from './data/data-post/data-post.component';
import { DataGetComponent } from './data/data-get/data-get.component';
import { TodoComponent } from './data/todo/todo.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] }, 
  { path: 'counter', component: CounterComponent },
  { path: 'book-list', component: BookListComponent },
  { path: 'data-post', component: DataPostComponent },
  { path: 'data-get', component: DataGetComponent },
  { path: 'data-todos', component: TodoComponent },
  { path: 'todo-list', component: TodoListComponent, canActivate: [AuthGuard] }, 
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

