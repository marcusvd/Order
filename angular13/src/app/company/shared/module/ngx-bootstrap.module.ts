import { NgModule } from "@angular/core";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrModule } from 'ngx-toastr';
import { CurrencyMaskModule, CURRENCY_MASK_CONFIG } from "ng2-currency-mask";
import { MASKOPTIONS } from "../helpers/simples-helpers";
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [

  ],
  imports: [
    // BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    ToastrModule.forRoot(),
    CurrencyMaskModule,
    NgSelectModule
  ],
  exports: [
    BsDropdownModule,
    PaginationModule,
    TabsModule,
    ToastrModule,
    CurrencyMaskModule,
    NgSelectModule
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: MASKOPTIONS }
  ]
})

export class NgxBootStrapModule {

}


