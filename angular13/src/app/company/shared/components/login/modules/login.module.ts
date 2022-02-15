import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from 'src/app/company/shared/module/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from '../entrance/login.component';
import { LoginServices } from '../services/login.service';
import { JwtInterceptor } from 'src/app/company/interceptors/jwt.interceptor';


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    LoginRoutingModule
  ],
  exports:[
    LoginComponent,
  ],
  providers:[
    LoginServices,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true},
  ]
})
export class LoginModule { }
