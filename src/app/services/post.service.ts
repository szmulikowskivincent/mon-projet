import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor() { }

  deletePost(postId: number): Observable<void> {
    return new Observable(observer => {
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            observer.next();  
            observer.complete();
          } else {
            observer.error('Error deleting post');
          }
        })
        .catch(error => {
          observer.error('Error deleting post');
        });
    });
  }

  updatePost(id: any, updatedData: any): Observable<any> {
    return new Observable(observer => {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      })
        .then(response => response.json())
        .then(json => {
          observer.next(json);
          observer.complete();
        })
        .catch(error => {
          observer.error('Error updating post');
        });
    });
  }

  getPosts(): Observable<any> {
    return new Observable(observer => {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => {
          observer.next(json);
          observer.complete();
        })
        .catch(error => {
          observer.error('Error fetching posts');
        });
    });
  }

  getPostById(postId: number): Observable<any> {
    return new Observable(observer => {
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(response => response.json())
        .then(json => {
          observer.next(json);
          observer.complete();
        })
        .catch(error => {
          observer.error('Error fetching post');
        });
    });
  }

  getCommentsByPostId(postId: number): Observable<any> {
    return new Observable(observer => {
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(response => response.json())
        .then(comments => {
          observer.next(comments);
          observer.complete();
        })
        .catch(error => {
          observer.error('Error fetching comments');
        });
    });
  }
}

