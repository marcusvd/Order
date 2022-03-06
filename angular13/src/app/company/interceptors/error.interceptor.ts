import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { AuthenticationService } from "../shared/services/authentication.service";

@Injectable()

export class ErrorInterceptor implements HttpInterceptor {

  constructor(private _Authentication: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(this.handleError))
  }

  handleError(error: any) {

    if (error.status === 401) {
      this._Authentication.logout();
      location.reload();
    }

    const errorReturn = error.error.message || error.statusText;

    return throwError(error);

    // let errorMessage = '';
    // if (error.error instanceof ErrorEvent) {
    //   //client side error
    //   errorMessage = `Error: ${error.error.message}`
    // }
    // else{
    //   errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    // }
    // console.log(errorMessage);
    // return throwError(() => {
    //   return errorMessage;
    // })
  }
}
