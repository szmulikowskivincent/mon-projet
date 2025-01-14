import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; 

  constructor(private http: HttpClient) { }

  createPost(postData: any): Observable<any> {
    return this.http.post(this.apiUrl, postData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  deletePost(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${postId}`);
  }

  updatePost(id: number, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  getPosts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getPostById(postId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${postId}`);
  }

  getCommentsByPostId(postId: number): Observable<any> {
    return this.http.get<any>(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  }
}


