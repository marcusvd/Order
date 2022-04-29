import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/module/shared.module';
import { MeasureInsertService } from '../services/measure-insert.service';
import { MeasureInsertComponent } from 'src/app/company/measure/measure-insert/measure-insert.component';
import { MeasureEditComponent } from 'src/app/company/measure/measure-edit/measure-edit.component';
import { MeasureListComponent } from '../measure-list/measure-list.component';
import { MeasureEditService } from '../services/measure-edit.service';



@NgModule({
  declarations: [
    MeasureInsertComponent,
    MeasureEditComponent,
    MeasureListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule
    // MeasureRoutingModule
  ],
  exports:[

    MeasureListComponent,
  ],
  providers:[
    MeasureInsertService,
    MeasureEditService,
    //  {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},

  ]
})


export class MeasureModule { }
