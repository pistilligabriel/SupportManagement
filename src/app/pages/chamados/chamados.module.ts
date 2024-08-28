import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { PrimengModule } from "../../libraries/primeng.module";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { CommonModule } from "@angular/common";
import { ChamadosComponent } from "./chamados.component";
import { chamadosRouter } from "./chamados.routing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";

@NgModule({
  declarations: [
   ChamadosComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(chamadosRouter),
    PrimengModule,
    SharedModule
  ],
  providers: [ConfirmationService, MessageService],
})
export class ChamadosModule { }
