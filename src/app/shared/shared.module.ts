import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { PrimengModule } from "../libraries/primeng.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    RouterModule,
    FontAwesomeModule,
    PrimengModule,
  ],
  exports:[FontAwesomeModule, HeaderComponent],
  providers:[]
})
export class SharedModule { }
