import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WelcomeComponent } from "src/app/company/welcome/welcome.component";
import { LoginComponent } from '../entrance/login.component';

const USERROUTING: Routes = [
  // {path: 'login', component: LoginComponent},
  // {path: '', redirectTo: 'login', pathMatch: 'full'},
  // {path: '', runGuardsAndResolvers: 'always', canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(USERROUTING)],
  exports: [RouterModule]
})

export class LoginRoutingModule { }
