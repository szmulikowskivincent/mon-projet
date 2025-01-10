import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from '../components/counter/counter.component';
import { TodoListComponent } from '../components/todo-list/todo-list.component';
import { LoginComponent } from 'src/components/login/login.component';
import { RegisterComponent } from 'src/components/register/register.component';
import { ProfilComponent } from 'src/components/profil/profil.component';
import { AuthGuard } from '../components/auth-guard/auth-guard.component';
import { NotFoundComponent } from '../components/not-found/not-found.component'; 
import { BookListComponent } from '../components/book-list/book-list.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] }, 
  { path: 'counter', component: CounterComponent },
  { path: 'book-list', component: BookListComponent },
  { path: 'todo-list', component: TodoListComponent, canActivate: [AuthGuard] }, 
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

