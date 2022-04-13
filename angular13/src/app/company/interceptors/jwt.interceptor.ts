import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, take, tap } from "rxjs";

import { UserDto } from "../shared/components/login/dto/user-dto";
import { AuthenticationService } from "../shared/services/authentication.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private _AuthenticationService: AuthenticationService,
    private _Router: Router
    ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser: UserDto;
    this._AuthenticationService?.currentUser?.pipe(take(1)).subscribe(user => {
      currentUser = user

      if (currentUser) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`
          }
        }
        )
      }
    });

    return next.handle(req).pipe( tap(()=> {},
    (err: any) => {
      if(err instanceof HttpErrorResponse){
        if(err.status !== 401){
          return;
        }
        this._Router.navigate(['/login']);
      }
    }));
  }





}
