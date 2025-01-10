import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  getPosts() {
    throw new Error('Method not implemented.');
  }
  getPostById(postId: number) {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  getTodo(): Observable<any> {
    return new Observable(observer => {
      fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => {
          observer.next(json);
          observer.complete();
        })
        .catch(error => {
          observer.error('Error fetching data');
        });
    });
  }

  getCommentsByPostId(postId: number): Observable<any> {
    return new Observable(observer => {
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(response => response.json())
        .then(comments => {
          const uniqueComments = comments.filter((value: { id: any; }, index: any, self: any[]) =>
            index === self.findIndex((t: { id: any; }) => (
              t.id === value.id
            ))
          );
          observer.next(uniqueComments);
          observer.complete();
        })
        .catch(error => {
          observer.error('Error fetching comments');
        });
    });
  }

  getCommentById(commentId: number): Observable<any> {
    return new Observable(observer => {
      fetch(`https://jsonplaceholder.typicode.com/comments/${commentId}`)
        .then(response => response.json())
        .then(json => {
          observer.next(json);
          observer.complete();
        })
        .catch(error => {
          observer.error('Error fetching comment');
        });
    });
  }

  getTodoById(id: number): Observable<any> {
    return new Observable(observer => {
      fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(response => response.json())
        .then(json => {
          observer.next(json);
          observer.complete();
        })
        .catch(error => {
          observer.error('Error fetching data');
        });
    });
  }

  getCommentByIdInPost(postId: number, commentId: number): Observable<any> {
    return new Observable(observer => {
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(response => response.json())
        .then(comments => {
          const uniqueComments = comments.filter((value: { id: any; }, index: any, self: any[]) =>
            index === self.findIndex((t) => (
              t.id === value.id
            ))
          );
          const comment = uniqueComments.find((c: any) => c.id === commentId);
          if (comment) {
            observer.next(comment);
            observer.complete();
          } else {
            observer.error('Comment not found');
          }
        })
        .catch(error => {
          observer.error('Error fetching comments');
        });
    });
  }
}




