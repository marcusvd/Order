import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from '../../shared/module/shared.module';
import { MeasureInsertService } from '../services/measure-insert.service';
// import { MeasureRoutingModule } from './measure-routing.module';
import { MeasureInsertComponent } from 'src/app/company/measure/measure-insert/measure-insert.component';
import { MeasureEditComponent } from 'src/app/company/measure/measure-edit/measure-edit.component';
import { MeasureAdmComponent } from '../measure-adm/measure-adm.component';
import { RouterModule } from '@angular/router';
import { MeasureEditService } from '../services/measure-edit.service';



@NgModule({
  declarations: [
    MeasureInsertComponent,
    MeasureEditComponent,
    MeasureAdmComponent,
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

    MeasureAdmComponent,
  ],
  providers:[
    MeasureInsertService,
    MeasureEditService,
    //  {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},

  ]
})


export class MeasureModule { }
