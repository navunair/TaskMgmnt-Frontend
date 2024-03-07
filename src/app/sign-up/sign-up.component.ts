import { group } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterOutlet, HttpClientModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  providers: [ApiService]
})
export class SignUpComponent implements OnInit{
  signupForm!: FormGroup;
  constructor(private http:HttpClient,  private router: Router, private apiservice: ApiService){}
  ngOnInit() {
    this.signupForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      groupName: new FormControl('',[Validators.required]),
      referral: new FormControl(null)
    })
  }
  onSubmit(){
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      const dto = {
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        name: this.signupForm.value.name,
        groupName: this.signupForm.value.groupName,
        referralCode: this.signupForm.value.referral
      }
      this.apiservice.signup(dto).subscribe(
        {next:(response) => {
          console.log(response);
          this.apiservice.setToken(response);
          this.router.navigate(['/signin']);
          console.log('user signup success');
        },
        error:(error) => {
          console.error('Signup error:', error);
        }}
      );
    }
  }  
  // onSubmit(): void {
  //   if (this.signupForm.valid) {
  //     const headers = new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     });
  
  //     this.http.post('https://localhost:7197/api/signup', this.signupForm.value, { headers: headers, responseType: 'text' })
  //       .subscribe(
  //         (res) => {
  //           console.log("Success", res);
  //           this.router.navigate(['/signin']);
  //         },
  //         (error) => {
  //           console.error("Error", error);
  //         }
  //       );
  //   }
  //   else {
  //     console.log('Cannot submit form');
  //   }
  // }
}
    
