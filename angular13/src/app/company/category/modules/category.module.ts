import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CategoryInsertComponent } from '../category-insert/category-insert.component';
import { SharedModule } from '../../shared/module/shared.module';
import { CategoryService } from '../services/category.service';
//import { CategoryRoutingModule } from './category-routing.module';
import { CategoryAdmComponent } from '../category-adm/category-adm.component';
import { AuthGuard } from '../../guards/auth.guard';


@NgModule({
  declarations: [
    CategoryInsertComponent,
    CategoryAdmComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    //CategoryRoutingModule
  ],
  exports:[
    CategoryInsertComponent,
    CategoryAdmComponent
  ],
  providers:[CategoryService, AuthGuard]
})
export class CategoryModule { }
