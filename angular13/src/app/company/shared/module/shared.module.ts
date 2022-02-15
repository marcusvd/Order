import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from '../components/side-nav/side-nav.component';
import { NgxBootStrapModule } from './ngx-bootstrap.module';
import { SharedRoutingModule } from './shared-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SideNavComponent
  ],
  imports: [
    CommonModule,
    NgxBootStrapModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    FormsModule,



  ],
  exports: [
    SideNavComponent,
    NgxBootStrapModule,

  ],
  providers: [],
})
export class SharedModule { }
