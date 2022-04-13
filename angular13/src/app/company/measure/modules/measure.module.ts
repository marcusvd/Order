import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from '../../shared/module/shared.module';
import { MeasureService } from '../services/measure.service';
// import { MeasureRoutingModule } from './measure-routing.module';
import { MeasureAdmComponent } from '../measure-adm/measure-adm.component';



@NgModule({
  declarations: [

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

    MeasureAdmComponent,
  ],
  providers:[
    MeasureService,
    //  {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},

  ]
})


export class MeasureModule { }
