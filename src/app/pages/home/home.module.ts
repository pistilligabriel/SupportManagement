import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { PrimengModule } from "../../libraries/primeng.module";
import { HomeComponent } from "./home.component";
import { RouterModule } from "@angular/router";
import { homeRouter } from "./home.routing";
import { SharedModule } from "../../shared/shared.module";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
   HomeComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(homeRouter),
    PrimengModule,
    SharedModule
  ],
  providers: [],
})
export class HomeModule { }
