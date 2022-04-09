import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ProductService } from 'src/app/company/product/services/product-service';
import { UserDto } from 'src/app/company/shared/components/login/dto/user-dto';
import { UsrToken } from '../../dto/usr-token';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  providers: []
})
export class SideNavComponent implements OnInit {

  constructor(
    private _Router: Router,
    public _AuthenticationService: AuthenticationService,
    //just test below
    public proSrv: ProductService,
  ) { }


  quit() {
    this._AuthenticationService.logout();
    this._Router.navigate(['/login']);
  }
  // public _opened: boolean = true;
  getUserName(): string {
    let timeIsNow = new Date();

    if (this._AuthenticationService.currentUserValue?.expiration === null) {
      this._AuthenticationService.logout();

    }
    return this._AuthenticationService.currentUserValue?.userName;
  }

  isAuthenticated(): boolean {
    let timeIsNow = new Date();
    if (this._AuthenticationService.currentUserValue?.expiration) {

    }
    else{

      this._AuthenticationService.logout();
    }


    if (this._AuthenticationService.IsAuthenticated) {
      return true;
    }
    return false;
  }






  ngOnInit(): void {


  }

}
