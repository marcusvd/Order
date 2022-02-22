import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ProductService } from 'src/app/company/product/services/product-service';
import { UserDto } from 'src/app/company/shared/components/login/dto/user-dto';
import { LoginServices } from 'src/app/company/shared/components/login/services/login.services';
import { UsrToken } from '../../dto/usr-token';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  providers: []
})
export class SideNavComponent implements OnInit {


  // public _opened: boolean = true;

  getUserName(): string {
    let User = new UsrToken();
    User = JSON.parse(localStorage.getItem('usr'));
    console.log(User?.userName)
    console.log('ACHAR', User)
    return  User?.userName;
    // .split('@')[0]

  }
  isAuthenticated(): boolean {
    let User = new UserDto();
    User = JSON.parse(localStorage.getItem('usr'));
    return User?.authenticated;
  }

  constructor(
    private _Route: Router,
    public _LogServices: LoginServices,
    //just test below
    public proSrv: ProductService,


  ) { }

  // open() {
  //   this._Route.navigate(['clientlist']);
  // }
  // showHide() {
  //   return this._opened = !this._opened;
  // }


  // toggle() {
  //   this._opened = !this._opened;
  // }


  ngOnInit(): void {


  }

}
