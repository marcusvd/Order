import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MeasureInsertComponent } from '../measure-insert/measure-insert.component';
import { SharedModule } from '../../shared/module/shared.module';
import { MeasureService } from '../services/measure.service';
import { MeasureRoutingModule } from './measure-routing.module';
import { MeasureAdmComponent } from '../measure-adm/measure-adm.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../../interceptors/jwt.interceptor';


@NgModule({
  declarations: [
    MeasureInsertComponent,
    MeasureAdmComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    // MeasureRoutingModule
  ],
  exports:[
    MeasureInsertComponent,
    MeasureAdmComponent,
  ],
  providers:[
    MeasureService,
    //  {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},

  ]
})
export class MeasureModule { }
