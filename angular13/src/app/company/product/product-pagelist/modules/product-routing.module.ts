import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// import { CategoryInsertComponent } from "../../category/category-insert/category-insert.component";
// import { AuthGuard } from "../../guards/auth.guard";
// import { ProdutsResolver } from "../../guards/resolvers/produts.resolver";
// import { PaginatedResult } from "../../shared/dto/pagination";
// import { WelcomeComponent } from "../../welcome/welcome.component";
// import { ProductDto } from "../dto/product-dto";
// import { ProductInsertComponent } from "../product-insert/product-insert.component";
// import { ProductPagelistComponent } from "../product-pagelist/product-pagelist.component";



const ROUTES: Routes = [
  // {path:'prodpagelist', component:ProductPagelistComponent, resolve: {loaded: ProdutsResolver}, canActivate: [AuthGuard]},  //, canActivate: [AuthGuard]
  // {path:'prodinsert', component:ProductInsertComponent, canActivate: [AuthGuard]},
  // {path: '**', component: WelcomeComponent},
]

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class ProductRoutingModule {

}
