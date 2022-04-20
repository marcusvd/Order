import { RecordsComponent } from 'src/app/company/records/records.component';
import { NgModule } from "@angular/core";
import { SharedModule } from '../../shared/module/shared.module';
import { NgxBootStrapModule } from '../../shared/module/ngx-bootstrap.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CategoryInsertComponent } from 'src/app/company/category/category-insert/category-insert.component';
import { ProductInsertComponent } from 'src/app/company/product/product-insert/product-insert.component'
import { MeasureInsertComponent } from 'src/app/company/measure/measure-insert/measure-insert.component';
import { RegisterComponent } from 'src/app/company/shared/components/register/register.component';

@NgModule({
  declarations: [
    RecordsComponent,
    // CategoryInsertComponent,
    ProductInsertComponent,
    MeasureInsertComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,

  ],
  exports: [RecordsComponent]
})



export class RecordsModule {

}
