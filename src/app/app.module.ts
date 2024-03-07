import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { RouterOutlet } from "@angular/router";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtInterceptor } from "./interceptor/auth.interceptor";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app.routes";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    declarations:[AppComponent],
    imports: [RouterOutlet, SignUpComponent, SignInComponent,BrowserModule,AppRoutingModule, BrowserAnimationsModule, ToastrModule.forRoot()],
    providers:[
{
    provide:HTTP_INTERCEPTORS,
    useClass:JwtInterceptor,
    multi:true
}    ],
    bootstrap:[AppComponent]

})

export class AppModule{}