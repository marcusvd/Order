import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../../guards/auth.guard";
import { CategoryAdmComponent } from "../category-adm/category-adm.component";
import { CategoryInsertComponent } from "../category-insert/category-insert.component";

const catrouting: Routes = [
  // {path:'catinsert', component: CategoryInsertComponent, canActivate: [AuthGuard]},
  // {path:'catadm', component: CategoryAdmComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(catrouting)],
  exports: [RouterModule]
})

export class CategoryRoutingModule { }
