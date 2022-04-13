import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/company/shared/module/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from '../entrance/login.component';
import { RegisterServices } from '../services/register.services';


@NgModule({
  declarations: [
    LoginComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    LoginRoutingModule,

  ],
  exports: [
    LoginComponent,
  ],
  providers: [
    RegisterServices
    // {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true},
  ]
})
export class LoginModule { }
