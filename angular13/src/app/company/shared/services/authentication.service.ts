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
  //  public StoredToken: UserDto;

  constructor(
    override Http: HttpClient,
    private _Fb: FormBuilder,
  ) {
    super(Http, Url._ACCESSCONTROL)
    //  this.currentUserSubject = new BehaviorSubject<UserDto>(this.StoredToken);
    this.currentUserSubject = new BehaviorSubject<UserDto>(JSON.parse(localStorage.getItem('usr')));
 //   this.currentUserSubject = new BehaviorSubject<UserDto>(JSON.parse(sessionStorage.getItem('usr')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(user: UserDto): Observable<UserDto> {
    // const u: UserDto = new UserDto();
    // this.StoredToken = new UserDto();

    return this.Http.post<UserDto>(`${Url._ACCESSCONTROL}/login`, user)
      .pipe(map(usr => {

        localStorage.setItem('usr', JSON.stringify(usr))
        //sessionStorage.setItem('usr', JSON.stringify(usr))
        //    this.StoredToken = JSON.stringify('usr');
        //this.StoredToken = usr;

        this.currentUserSubject.next(usr);
        return usr;
      }))
  }

  logout() {
    localStorage.removeItem('usr');
    //sessionStorage.removeItem('usr');
    // this.StoredToken = null;
    //this.currentUserSubject.complete();
    this.currentUser = null;
    this.currentUserSubject.next(null);
  }

  formMaker() {
    this.form = this._Fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }


  public get currentUserValue(): UserDto {
    return this.currentUserSubject.value;
  }



  public get IsAuthenticated(): boolean {

    let auth: boolean;

    if (this.currentUserSubject?.value) {
      return true;
    }
    if (new Date().getTime() > (new Date(this.currentUserSubject?.value?.expiration).getTime())) {
      this.logout();
    }
    // if (this.currentUser) {
    //   return true;
    // }
    return false;

    // return false;
  }

  // public get isStillConnected(): boolean {

  //   this.currentUser.subscribe((item: UserDto) => {
  //     if (item.authenticated) {
  //       return true;
  //     }
  //   }, error => {
  //     return false;
  //   })
  //   return false;
  // }
}
