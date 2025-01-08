import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  isAuthenticated(): boolean {
    return sessionStorage.getItem('token') !== null; 
  }

  login(token: string): void {
    sessionStorage.setItem('token', token);
  }

  logout(): void {
    sessionStorage.removeItem('token');
  }
}
