import { Component, OnInit } from '@angular/core';
import { UserDto } from '../login/dto/user-dto';
import { RegisterServices } from '../login/services/register.services';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public _Reg: RegisterServices) { }







  ngOnInit(): void {
    this._Reg.makeForm();
  }






}
