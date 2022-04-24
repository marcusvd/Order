import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, ReplaySubject, take } from "rxjs";
import { Router } from "@angular/router";

import { CrudService } from "src/app/company/shared/services/crud.service";
import { UserDto } from "../dto/user-dto";
import { Url } from "src/app/company/back-end/back-end";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UserRegisterDto } from "../dto/user-register-dto";

@Injectable()

export class RegisterServices extends CrudService<UserRegisterDto, number> {

  constructor(
    override Http: HttpClient,
    private _Route: Router,
    private _Fb: FormBuilder
  ) {
    super(
      Http,
      Url._ACCESSCONTROL + '/register',
    )
  }
  _formGroupControl: FormGroup;

  makeForm(): FormGroup {
    return this._formGroupControl = this._Fb.group({
      userName: ['', []],
      password: ['', []],
      confirmPassword: ['', []]
    })
  }

  register() {
    const usr: UserRegisterDto = this._formGroupControl.value;
    console.log(usr)
    return this.Http.post<UserRegisterDto>(Url._ACCESSCONTROL + '/register', usr).subscribe((item) => {
    alert('Deu TOP');
    });
  }

}
