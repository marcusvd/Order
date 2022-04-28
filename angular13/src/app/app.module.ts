import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CategoryModule } from './company/category/modules/category.module';
import { ProductModule } from './company/product/modules/product.module';
import { SharedModule } from './company/shared/module/shared.module';
import { MeasureModule } from './company/measure/modules/measure.module';
import { LoginModule } from 'src/app/company/shared/components/login/modules/login.module';
import { JwtInterceptor } from 'src/app/company/interceptors/jwt.interceptor';
import { ErrorInterceptor } from 'src/app/company/interceptors/error.interceptor';
import { RecordsModule } from './company/records/modules/records.module';
import { AuthenticationService } from './company/shared/services/authentication.service';




@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CategoryModule,
    MeasureModule,
    ProductModule,
    SharedModule,
    LoginModule,
    RecordsModule,
    // BsDatepickerModule.forRoot(),

  ],
  providers: [AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
