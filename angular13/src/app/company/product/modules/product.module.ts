import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductPagelistComponent } from 'src/app/company/product/product-pagelist/product-pagelist.component';
import { ProductInfoEditComponent } from '../product-info-edit/product-info-edit.component';
import { SharedModule } from '../../shared/module/shared.module';
import { ProductService } from '../services/product-service';
import { NgxBootStrapModule } from 'src/app/company/shared/module/ngx-bootstrap.module';
import { ProductInsertService } from '../services/product-insert.service';

@NgModule({
  declarations: [
    ProductPagelistComponent,
    ProductInfoEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxBootStrapModule,
    RouterModule,
  ],
  exports: [
    NgxBootStrapModule,
    ProductPagelistComponent
  ],
  providers: [ProductService, ProductInsertService]
})
export class ProductModule { }
