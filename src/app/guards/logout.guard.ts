import { Injectable } from '@angular/core';
import {CanActivate,Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class logoutGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('Bearer');
    // console.log("hiii")
    if (token) {
      this.router.navigate(['/dashboard']);
      // this.router.navigate(['/signin']);
      return false;
    } else {
      
      return true;
    }
       
  }
}