import { Component } from '@angular/core';
import { take } from 'rxjs';
import { UserDto } from './company/shared/components/login/dto/user-dto';
import { Url } from 'src/app/company/back-end/back-end'
import { AuthenticationService } from './company/shared/services/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _AuthenticationService: AuthenticationService) {

  }

  ngOnInit(): void {





  }

  setCurrentUser(): void {
    let user: UserDto;

    localStorage.getItem('usr')

    localStorage.getItem('usr')

    if (user)
    //  this._LoginSrv.setCurrentUser(user);


    {



    }
  }






}
