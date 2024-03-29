import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductPagelistComponent } from 'src/app/company/product/product-pagelist/product-pagelist.component';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { SharedModule } from '../../shared/module/shared.module';
import { NgxBootStrapModule } from 'src/app/company/shared/module/ngx-bootstrap.module';
import { ProductInsertService } from '../services/product-insert.service';
import { ProductListService } from '../services/product-list.service';
import { ProductInfoComponent } from '../product-info/product-info.component';
import { DateTimeFormatPipe } from '../../shared/helpers/pipes/date-time-format.pipe';
import { ProductResolver } from '../resolvers/products.resolver';
import { ProductInfoService } from '../services/product-info.service';

@NgModule({
  declarations: [
    ProductEditComponent,
    ProductPagelistComponent,
    ProductInfoComponent,
    DateTimeFormatPipe
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

  ],
  providers: [ ProductInsertService,ProductListService, ProductResolver, ProductInfoService]
})
export class ProductModule { }
