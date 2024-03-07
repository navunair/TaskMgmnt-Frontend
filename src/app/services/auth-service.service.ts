import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:7197/api'; // Replace this with your API endpoint
  private authTokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }
  signup(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, credentials);
  }

  setAuthToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  // isLoggedIn(): boolean {
  //   return !!this.getAuthToken();
  // }

  // logout(): void {
  //   localStorage.removeItem(this.authTokenKey);
  // }

  createAuthHeaders(): HttpHeaders {
    const authToken = this.getAuthToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
  }

  getUserProfile(): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/profile`, { headers });
  }
}
