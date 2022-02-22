import { Component } from '@angular/core';
import { take } from 'rxjs';
import { UserDto } from './company/shared/components/login/dto/user-dto';
import { LoginServices } from './company/shared/components/login/services/login.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _LoginSrv: LoginServices) { }

  ngOnInit(): void {
    this.setCurrentUser();
    // this._LoginSrv.currentUser$.pipe(take(1)).subscribe((usr: UserDto) => {
    //   if(usr.authenticated)
    //   {
    //     this._LoginSrv._loginUserStr = usr.email;
    //     console.log('aqui, aqui, aqui')
    //   }
    //   else{
    //     this._LoginSrv._loginUserStr = 'Entrar';
    //     console.log('aqui2, aqui2, aqui2')
    //   }


    // })
  }

  setCurrentUser(): void {
    let user: UserDto;
    if (localStorage.getItem('usr')) {
      user = JSON.parse(localStorage.getItem('usr') ?? '{}');
    }
    else {
      user = null
    }
    if (user)
      this._LoginSrv.setCurrentUser(user);
  }




}
