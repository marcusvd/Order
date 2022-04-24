import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from '../../shared/module/shared.module';
import { CategoryListService } from '../services/category-list.service';
//import { CategoryRoutingModule } from './category-routing.module';
import { CategoryAdmComponent } from '../category-adm/category-adm.component';
import { AuthGuard } from '../../guards/auth.guard';
import { RouterModule } from '@angular/router';
import { CategoryEditService } from '../services/category-edit.service';
import { CategoryInsertService } from '../services/category-insert.service';
import { CategoryInsertComponent } from 'src/app/company/category/category-insert/category-insert.component';
import { CategoryInfoComponent } from 'src/app/company/category/category-info/category-info.component';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { Auth0Guard } from '../../guards/auth-0.guard';



@NgModule({
  declarations: [
    CategoryAdmComponent,
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
    // CategoryInsertComponent,
    CategoryAdmComponent
  ],
  providers:[CategoryListService, CategoryEditService, CategoryInsertService ]
})
export class CategoryModule { }
