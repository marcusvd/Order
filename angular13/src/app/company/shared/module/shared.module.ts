import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from '../components/side-nav/side-nav.component';
import { NgxBootStrapModule } from './ngx-bootstrap.module';
import { SharedRoutingModule } from './shared-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ToNumberPipe } from '../helpers/pipes/myCurrency';
import { DeleteComponent } from '../components/delete/delete.component';
import { DeleteService } from '../components/delete/services/delete.service';
import { WelcomeComponent } from 'src/app/company/welcome/welcome.component';

import { NotFoundComponent } from 'src/app/not-found/not-found.component';
import { Auth0Guard } from '../../guards/auth-0.guard';
import { SellComponent } from '../components/sell/sell.component';
import { SellService } from '../components/sell/services/sell.service';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SideNavComponent,
    ToNumberPipe,
    DeleteComponent,
    SellComponent,
    WelcomeComponent,
    NotFoundComponent,

  ],
  imports: [
    CommonModule,
    NgxBootStrapModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,




  ],
  exports: [
    SideNavComponent,
    NgxBootStrapModule,
    ToNumberPipe,
    DeleteComponent,
    WelcomeComponent,
    NotFoundComponent,
    SellComponent,

  ],
  providers: [DeleteService, Auth0Guard, SellService],
})
export class SharedModule { }
