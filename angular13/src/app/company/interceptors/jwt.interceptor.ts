import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, take } from "rxjs";

import { UserDto } from "../shared/components/login/dto/user-dto";
import { LoginServices } from "../shared/components/login/services/login.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private _LoginServices: LoginServices) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser: UserDto;

    this._LoginServices.currentUser$.pipe(take(1)).subscribe(user => {
      currentUser = user
      if (currentUser) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`
          }
        }
        );
      }
    });


    return next.handle(req);
  }

}
