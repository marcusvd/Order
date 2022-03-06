import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, take } from "rxjs";

import { UserDto } from "../shared/components/login/dto/user-dto";
import { LoginServices } from "../shared/components/login/services/login.services";
import { AuthenticationService } from "../shared/services/authentication.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private _AuthenticationService: AuthenticationService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser: UserDto;
    this._AuthenticationService.currentUser.pipe(take(1)).subscribe(user => {
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
