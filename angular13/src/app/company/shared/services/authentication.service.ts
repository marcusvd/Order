import { HttpClient, JsonpClientBackend } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject, map, Observable } from "rxjs";
import { Url } from "src/app/company/back-end/back-end";

import { UserDto } from "../components/login/dto/user-dto";
import { CrudService } from "./crud.service";

@Injectable()

export class AuthenticationService extends CrudService<UserDto, number> {

  private currentUserSubject: BehaviorSubject<UserDto>;
  public currentUser: Observable<UserDto>;
  public form: FormGroup;
 // public StoredToken: string;

  constructor(
    override _Http: HttpClient,
    private _Fb: FormBuilder,
  ) {
    super(_Http, Url._ACCESSCONTROL)
    this.currentUserSubject = new BehaviorSubject<UserDto>(JSON.parse(localStorage.getItem('usr')));
    // this.currentUserSubject = new BehaviorSubject<UserDto>(JSON.parse(sessionStorage.getItem('usr')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(user: UserDto): Observable<UserDto> {
    return this._Http.post<UserDto>(`${Url._ACCESSCONTROL}/login`, user)
      .pipe(map(usr => {

        localStorage.setItem('usr', JSON.stringify(usr))
        //sessionStorage.setItem('usr', JSON.stringify(usr))
       // this.StoredToken = JSON.stringify('usr');
        this.currentUserSubject.next(usr);
        return usr;
      }))
  }

  logout() {
    localStorage.removeItem('usr');
    //this.currentUserSubject.complete();
    this.currentUserSubject.next(null);
  }

  formMaker() {
    this.form = this._Fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }


  public get currentUserValue(): UserDto {
    return this.currentUserSubject.value;
  }

}
