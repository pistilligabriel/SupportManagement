import { forwardRef, NgModule } from "@angular/core";
import { PrimengModule } from "../../libraries/primeng.module";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { chamadosRouter } from "./configuracoes.routing";
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { AppLayoutModule } from "../../layout/app.layout.module";
import { ConfiguracoesComponent } from "./configuracoes.component";
import { FileUpload } from "primeng/fileupload";

@NgModule({
  declarations: [
   ConfiguracoesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(chamadosRouter),
    PrimengModule,
    AppLayoutModule
  ],
  providers: [ConfirmationService, MessageService, {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FileUpload),
    multi: true,
  }],
})
export class ConfiguracoesModule { }
