import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todo: any;
  comment: any; 
  commentId: number = 1;  
  photoId: number | null = null;
  photo: any;
  error: string | null = null;

  constructor(
    private todoService: TodoService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.todoService.getTodo().subscribe({
      next: (data) => {
        this.todo = data;
      },
      error: (err) => {
        this.error = err;
      }
    });

    this.searchCommentById();
  }

  searchCommentById(): void {
    if (!this.commentId) {
      this.error = 'Please enter a valid Comment ID.';
      return;
    }

    this.todoService.getCommentById(this.commentId).subscribe({
      next: (data) => {
        this.comment = data;
        this.error = null; 
      },
      error: (err) => {
        this.error = 'Comment not found.';
        this.comment = null; 
      }
    });
  }

  searchTodoById(): void {
    if (!this.todo) {
      this.error = 'Please enter a valid ID.';
      return;
    }

    this.todoService.getTodoById(this.todo).subscribe({
      next: (data) => {
        this.todo = data;
        this.error = null; 
      },
      error: (err) => {
        this.error = 'Todo not found.';
        this.todo = null; 
      }
    });
  }

  searchPhotoById(): void {
    if (!this.photoId) {
      this.error = 'Please enter a valid Photo ID.';
      return;
    }

    this.http.get(`https://jsonplaceholder.typicode.com/photos/${this.photoId}`).subscribe({
      next: (data) => {
        this.photo = data;
        this.error = null; 
      },
      error: (err) => {
        this.error = 'Photo not found.';
        this.photo = null; 
      }
    });
  }
}



