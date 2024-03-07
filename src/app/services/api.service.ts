import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


export interface ISignupDto{
  name: string,
  email: string,
  password: string,
  groupName: string,
  referral?: string
}
export interface ILoginDto{
  email: string,
  password: string
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url: string = 'https://localhost:7197/api';
  // private authTokenKey = 'authToken';
  constructor(private http: HttpClient) { }
  signup(body: ISignupDto){
    return this.http.post(`${this.url}/signup`,body, {responseType: 'text'})
  }
  login(body: ILoginDto){
    return this.http.post(`${this.url}/login`,body, {responseType: 'text'})
  }
  setToken(token: string): void {
    localStorage.setItem('Bearer', token);
  }

  getToken(): string | null {
    return localStorage.getItem('Bearer');
  }
}
