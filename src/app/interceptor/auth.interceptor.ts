import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { ApiService } from "../services/api.service";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class JwtInterceptor implements HttpInterceptor 
{
    constructor(private readonly apiService:ApiService, private toastr: ToastrService){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
  {
    let token = this.apiService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(request).pipe(
        catchError((error) => {
          if([401, 402].includes(error.status) ){
            this.toastr.error('Invalid Credentials');
          }
          else{
            this.toastr.error(error.error);
          }
          return throwError(error);
        })
      )
    }
    return next.handle(request);
  }
 }