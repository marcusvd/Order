import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
//NO NGX
import { CurrencyMaskModule, CURRENCY_MASK_CONFIG } from "ng2-currency-mask";
import { MASKOPTIONS } from "../helpers/simples-helpers";



@NgModule({
  declarations: [

  ],
  imports: [
    // BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    CurrencyMaskModule,

    NgSelectModule
  ],
  exports: [
    BsDatepickerModule,
    BsDropdownModule,
    PaginationModule,
    TabsModule,
    ToastrModule,
    CurrencyMaskModule,
    NgSelectModule,
    TooltipModule
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: MASKOPTIONS }
  ]
})

export class NgxBootStrapModule {

}


