import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../../guards/auth.guard";
import { CategoryListComponent } from "../category-list/category-list.component";
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
