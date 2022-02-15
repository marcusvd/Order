import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoryInsertComponent } from "../../category/category-insert/category-insert.component";
import { LoginComponent } from "src/app/company/shared/components/login/entrance/login.component";
import { ProductInsertComponent } from "../../product/product-insert/product-insert.component";
import { WelcomeComponent } from "../../welcome/welcome.component";
import { AuthGuard } from "../../guards/auth.guard";


const ROUTES: Routes = [
  {path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard]},
]

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class SharedRoutingModule {

}
