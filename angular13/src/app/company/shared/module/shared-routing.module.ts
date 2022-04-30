import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WelcomeComponent } from "../../welcome/welcome.component";


const ROUTES: Routes = [
  // {path: 'welcome', component: WelcomeComponent},
]

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})

export class SharedRoutingModule {

}
