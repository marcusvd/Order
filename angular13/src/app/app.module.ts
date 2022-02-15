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
import { WelcomeComponent } from './company/welcome/welcome.component';
import { JwtInterceptor } from './company/interceptors/jwt.interceptor';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NotFoundComponent,
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

  ],
 providers: [
  {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
],
  bootstrap: [AppComponent]
})
export class AppModule { }
