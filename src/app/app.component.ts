import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { RouterOutlet } from '@angular/router';
import { SignUpComponent } from "./sign-up/sign-up.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { ApiService } from './services/api.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
 
})
export class AppComponent {
  title = 'front-end';
}
