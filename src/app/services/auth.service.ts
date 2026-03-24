import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:3000/api/auth'; // base URL for auth endpoints

  constructor(private http: HttpClient) {}

  // send register request to backend
  register(data: any) {
    return this.http.post(`${this.API_URL}/register`, data);
  }

  // send login request to backend
  login(data: any) {
    return this.http.post(`${this.API_URL}/login`, data);
  }

  // save JWT token in localStorage after login
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  // remove token from localStorage on logout
  logout() {
    localStorage.removeItem('token');
  }

  // returns true if token exists (user is logged in)
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}