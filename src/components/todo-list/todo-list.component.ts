import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';  

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: string = '';
  nextId: number = 1;

  constructor(private toastr: ToastrService) {}  

  ngOnInit() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
      this.nextId = this.todos.length ? Math.max(...this.todos.map(todo => todo.id)) + 1 : 1;
    }
  }

  addTodo(): void {
    if (this.newTodo.trim()) {
      const newTodo: Todo = { id: this.nextId++, text: this.newTodo.trim(), completed: false };
      this.todos.push(newTodo);
      this.newTodo = '';
      this.saveTodos();
      this.toastr.success('Tâche ajoutée avec succès!', 'Succès');  
    } else {
      this.toastr.error('Veuillez entrer une tâche valide.', 'Erreur');
    }
  }

  deleteTodo(id: number): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      this.todos = this.todos.filter(todo => todo.id !== id);
      this.saveTodos();
      this.toastr.warning(`Tâche "${todo.text}" supprimée!`, 'Attention');  
    }
  }

  updateTodo(id: number): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      const newText = window.prompt('Nouvelle tâche:', todo.text);
      if (newText && newText.trim()) {
        todo.text = newText.trim();
        this.saveTodos();
        this.toastr.info('Tâche mise à jour avec succès!', 'Information');  
      } else {
        this.toastr.error('Mise à jour annulée. Tâche non valide.', 'Erreur');
      }
    }
  }

  toggleCompletion(id: number): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveTodos();
      this.toastr.success(
        `Tâche "${todo.text}" marquée comme ${todo.completed ? 'complétée' : 'non complétée'}.`,
        'Succès'
      );
    }
  }

  private saveTodos(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}






