import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { PrimengModule } from "../../libraries/primeng.module";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { CommonModule } from "@angular/common";
import { KanbanComponent } from "./kanban.component";
import { kanbanRouter } from "./kanban.routing";
import { ColunasKanbanComponent } from "../../components/colunasKanban/colunasKanban.component";

@NgModule({
  declarations: [
   KanbanComponent,
   ColunasKanbanComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(kanbanRouter),
    PrimengModule,
    SharedModule
  ],
  providers: [],
})
export class KanbanModule { }
