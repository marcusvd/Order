import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserDto } from '../shared/components/login/dto/user-dto';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    let usrToken: UserDto = new UserDto();
    usrToken = JSON.parse(localStorage.getItem('usr'));

    if (usrToken?.authenticated) {

      return true;
    }
    else {
     // this.router.navigate(['/login'])
      return false;
    }

  }

}
