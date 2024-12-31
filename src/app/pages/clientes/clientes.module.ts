import { NgModule } from "@angular/core";
import { PrimengModule } from "../../libraries/primeng.module";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ClientesComponent } from "./clientes.component";
import { clientesRouter } from "./clientes.routing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { AppLayoutModule } from "../../layout/app.layout.module";

@NgModule({
  declarations: [
   ClientesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(clientesRouter),
    PrimengModule,
    AppLayoutModule
  ],
  providers: [ConfirmationService, MessageService],
})
export class ChamadosModule { }
