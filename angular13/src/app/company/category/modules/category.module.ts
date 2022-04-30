import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

//import { CategoryRoutingModule } from './category-routing.module';
import { SharedModule } from '../../shared/module/shared.module';
import { CategoryListService } from '../services/category-list.service';
import { CategoryListComponent } from '../category-list/category-list.component';
import { CategoryEditService } from '../services/category-edit.service';
import { CategoryInsertService } from '../services/category-insert.service';
import { CategoryInsertComponent } from 'src/app/company/category/category-insert/category-insert.component';
import { CategoryInfoComponent } from 'src/app/company/category/category-info/category-info.component';
import { CategoryEditComponent } from '../category-edit/category-edit.component';




@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryInsertComponent,
    CategoryEditComponent,
    CategoryInfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule
    //CategoryRoutingModule
  ],
  exports:[

  ],
  providers:[CategoryListService, CategoryEditService, CategoryInsertService ]
})
export class CategoryModule { }
