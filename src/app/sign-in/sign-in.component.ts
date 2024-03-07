import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  providers: [ApiService]
})
export class SignInComponent implements OnInit {
  signinForm!: FormGroup;
  private authToken = '';
  constructor(private http:HttpClient, private router: Router, private apiservice: ApiService){}
  ngOnInit() {
    localStorage.clear();
    this.signinForm = new FormGroup({
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }

  onSubmit() {
    if (this.signinForm.valid) {
      const credentials = this.signinForm.value;
      console.log(credentials);
      this.apiservice.login(credentials)
      .subscribe({
        next:(res) => {
          // Handle successful signin response
          this.apiservice.setToken(res);
          console.log('Signin successful:', res);
          this.router.navigate(['/dashboard']);
        },
        error:error => {
          // Handle error response
          console.error('Signin failed:', error);
        }
      }
      );
    } else {
      this.signinForm.markAllAsTouched();
    }
  }

  // onSubmit(){
  //   if (this.signinForm.valid) {
  //     const headers = new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     });
  
  //     this.http.post('https://localhost:7197/api/login', this.signinForm.value, { headers: headers, responseType: 'text' })
  //       .subscribe(
  //         (res) => {
  //           console.log("Success", res);
  //           localStorage.setItem('Bearer', res);
  //           console.log(localStorage.getItem('Bearer'))
  //           this.router.navigate(['/dashboard']);
  //         },
  //         (error) => {
  //           console.error("Error", error);
  //         }
  //       );
  //   } else {
  //     console.log('Cannot submit form');
  //   }
  // }
}
