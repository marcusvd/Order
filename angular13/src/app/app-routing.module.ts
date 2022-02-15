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
import { WelcomeComponent } from './company/welcome/welcome.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'notfound', component: NotFoundComponent},
  {path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard]},
  {path:'catinsert', component: CategoryInsertComponent, canActivate: [AuthGuard]},
  {path:'catadm', component: CategoryAdmComponent, canActivate: [AuthGuard]},
  {path: 'measureinsert', component: MeasureInsertComponent, canActivate: [AuthGuard]},
  {path: 'measureadm', component: MeasureAdmComponent, canActivate: [AuthGuard]},
  {path:'prodpagelist', component:ProductPagelistComponent, resolve: {loaded: ProdutsResolver}, canActivate: [AuthGuard]},  //, canActivate: [AuthGuard]
  {path:'prodinsert', component:ProductInsertComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: 'notfound', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
