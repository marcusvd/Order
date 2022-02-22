import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsToastr } from '../../../services/alerts-toastr';
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
    private _Fb: FormBuilder,
    private _LoginService: LoginServices,
    private _Router: Router,
    private _AlertToastr: AlertsToastr
  ) { }

  userdto: UserDto = new UserDto();
  loginInfo: string;

  formMaker() {
    this.form = this._Fb.group({
      username: ['', [Validators.required]],
      password: ['', []],
    });
  }
  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
  toLogin() {
    if (this.form.valid) {
      const usr: UserDto = { ...this.form.value }
      this._LoginService.login(usr).subscribe(
        () => {
          this._Router.navigate(['/welcome']);
          console.log('AQUI', )
          // this._LoginService._shoHide = true;
          // this.loginInfo = null;
          this._AlertToastr.Notice(null, 0, usr.username);
        },
        (error: any) => {
          if (error.status == 401) {
            // this._LoginService._shoHide = false;
            this.loginInfo = ('Usuário ou Senha Incorretos...');
          }
          else {
            //console.error(error);

          }
        }
      );
    }
    // console.log(this.form.value)
  }
  ngOnInit(): void {
    this.formMaker();



    //  const token: UsrToken = JSON.parse(localStorage.getItem('usr'));

    //console.log(this.currentUser);


  }

}
