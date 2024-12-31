import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { PrimengModule } from "../../libraries/primeng.module";
import { HomeComponent } from "./home.component";
import { RouterModule } from "@angular/router";
import { homeRouter } from "./home.routing";
import { CommonModule } from "@angular/common";
import { AppLayoutModule } from "../../layout/app.layout.module";

@NgModule({
  declarations: [
   HomeComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(homeRouter),
    PrimengModule,
    AppLayoutModule
  ],
  providers: [],
})
export class HomeModule { }
