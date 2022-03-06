import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, ReplaySubject, take } from "rxjs";
import { Router } from "@angular/router";

import { CrudService } from "src/app/company/shared/services/crud.service";
import { UserDto } from "../dto/user-dto";
import { Url } from "src/app/company/back-end/back-end";

@Injectable()

export class LoginServices extends CrudService<UserDto, number> {
  public _shoHide: boolean;
  public _loginUser: boolean;
  public _loginUserStr: string;

  constructor(
    override _Http: HttpClient,
    private _Route: Router
  ) {
    super(_Http, Url._ACCESSCONTROL + 'login')
  }

  private currentUsr = new ReplaySubject<UserDto>(1);
  public currentUser$ = this.currentUsr.asObservable();

  login(user: UserDto) {
    return this._Http.post<UserDto>(`${Url._ACCESSCONTROL}/login`, user).pipe(
      take(1),
      map((response: UserDto) => {
        const user: UserDto = response;
        this.setCurrentUser(user);

      }))
  }

  logout(): void {
    localStorage.removeItem('usr');
    this.currentUsr.next(null);
    this.currentUsr.complete();
    this._Route.navigate(['/login']);
  }

  public setCurrentUser(usr: UserDto): void {

    localStorage.setItem('usr', JSON.stringify(usr));


    this.currentUsr.next(usr);
  }

  refresh(route?: string) {
    window.location.reload();
    if (route != null) {
      this._Route.navigate([route])
    }
  }





}
