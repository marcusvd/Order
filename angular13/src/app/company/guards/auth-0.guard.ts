import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

import { AuthenticationService } from "../shared/services/authentication.service";

@Injectable()
export class Auth0Guard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authenticationService.currentUserValue
    if (currentUser) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
