import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductPagelistComponent } from 'src/app/company/product/product-pagelist/product-pagelist.component';

import { SharedModule } from '../../shared/module/shared.module';
import { ProductService } from '../services/product-service';
// import { ProductRoutingModule } from './product-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@NgModule({
  declarations: [

    ProductPagelistComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    //ProductRoutingModule,

  ],
  exports:[

    ProductPagelistComponent
  ],
  providers: [ProductService]
})
export class ProductModule { }
