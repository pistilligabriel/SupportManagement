import { NgModule } from "@angular/core";
import { PrimengModule } from "../../libraries/primeng.module";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ChamadosComponent } from "./chamados.component";
import { chamadosRouter } from "./chamados.routing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { AppLayoutModule } from "../../layout/app.layout.module";

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
    AppLayoutModule
  ],
  providers: [ConfirmationService, MessageService],
})
export class ChamadosModule { }
