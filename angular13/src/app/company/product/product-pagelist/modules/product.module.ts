import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductPagelistComponent } from 'src/app/company/product/product-pagelist/product-pagelist.component';

import { SharedModule } from '../../../shared/module/shared.module';
import { ProductService } from '../../services/product-service';
// import { ProductRoutingModule } from './product-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxBootStrapModule } from 'src/app/company/shared/module/ngx-bootstrap.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '@auth0/angular-jwt';


@NgModule({
  declarations: [

    ProductPagelistComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxBootStrapModule,
    RouterModule,
    //ProductRoutingModule,

  ],
  exports: [
    NgxBootStrapModule,
    ProductPagelistComponent
  ],
  providers: [ProductService]


})
export class ProductModule { }
