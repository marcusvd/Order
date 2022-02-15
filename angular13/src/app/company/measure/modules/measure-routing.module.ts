import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../guards/auth.guard";
import { LoginComponent } from "../../shared/components/login/entrance/login.component";
import { MeasureAdmComponent } from "../measure-adm/measure-adm.component";

import { MeasureInsertComponent } from "../measure-insert/measure-insert.component";

const catrouting: Routes = [

  // {
  //   path: 'measureinsert', component: MeasureInsertComponent, canActivate: [AuthGuard]
  // },
  // {
  //   path: 'measureadm', component: MeasureAdmComponent, canActivate: [AuthGuard]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(catrouting)],
  exports: [RouterModule]
})

export class MeasureRoutingModule { }
