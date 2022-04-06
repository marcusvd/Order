import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "src/app/company/shared/components/login/entrance/login.component";
import { CategoryAdmComponent } from './company/category/category-adm/category-adm.component';
import { CategoryInsertComponent } from './company/category/category-insert/category-insert.component';
import { AuthGuard } from './company/guards/auth.guard';
import { ProdutsResolver } from './company/guards/resolvers/produts.resolver';
import { MeasureAdmComponent } from './company/measure/measure-adm/measure-adm.component';
import { MeasureInsertComponent } from './company/measure/measure-insert/measure-insert.component';
import { ProductInsertComponent } from './company/product/product-insert/product-insert.component';
import { ProductPagelistComponent } from './company/product/product-pagelist/product-pagelist.component';
import { RegisterComponent } from './company/shared/components/register/register.component';
import { WelcomeComponent } from './company/welcome/welcome.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {RecordsComponent} from 'src/app/company/records/records.component'
import { Auth0Guard } from './company/guards/auth-0.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'record', component: RecordsComponent},
  {path: 'register', component: RegisterComponent}, //, canActivate: [Auth0Guard]
  {path: 'notfound', component: NotFoundComponent},
  {path: 'welcome', component: WelcomeComponent, canActivate: [Auth0Guard]},
  {path:'catinsert', component: CategoryInsertComponent, canActivate: [Auth0Guard]},
  {path:'catadm', component: CategoryAdmComponent, canActivate: [Auth0Guard]},
  {path: 'measureinsert', component: MeasureInsertComponent, canActivate: [Auth0Guard]},
  {path: 'measureadm', component: MeasureAdmComponent, canActivate: [Auth0Guard]},
  {path:'prodpagelist', component:ProductPagelistComponent, resolve: {loaded: ProdutsResolver}, canActivate: [Auth0Guard]},
  {path:'prodinsert', component:ProductInsertComponent, canActivate: [Auth0Guard]},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: 'notfound', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
