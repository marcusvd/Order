import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { AlertsToastr } from '../../../services/alerts-toastr';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserDto } from '../dto/user-dto';
import { LoginServices } from '../services/login.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    public _AuthenticationService: AuthenticationService,
    private _AlertToastr: AlertsToastr,
    private _Router: Router
  ) { }

  userdto: UserDto;
  loginInfo: string;


  submit() {
    if (this._AuthenticationService.form.valid) {
      this.userdto = new UserDto();
      this.userdto = { ...this._AuthenticationService.form.value }
      this._AuthenticationService.login(this.userdto).pipe(take(1)).subscribe((usrDto: UserDto) => {
        this.userdto = usrDto;
        console.log(this.userdto)
        this._AlertToastr.Notice(this.userdto.userName.toLocaleUpperCase(), 3, 'success');
        this._Router.navigate(['/welcome']);
      }
      )
    }
  }





  // toLogin() {
  //   if (this.form.valid) {
  //     const usr: UserDto = { ...this.form.value }
  //     this._LoginService.login(usr).subscribe(
  //       () => {
  //         this._Router.navigate(['/welcome']);

  //         this._AlertToastr.Notice(null, 0, usr.username);
  //       },
  //       (error: any) => {
  //         if (error.status == 401) {
  //           // this._LoginService._shoHide = false;
  //           this.loginInfo = ('Usuário ou Senha Incorretos...');
  //         }
  //         else {
  //           console.error(error);

  //         }
  //       }
  //     );
  //   }

  // }



  ngOnInit(): void {
    this._AuthenticationService.formMaker();
  }

}
