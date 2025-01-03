import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { PrimengModule } from "../../libraries/primeng.module";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { KanbanComponent } from "./kanban.component";
import { kanbanRouter } from "./kanban.routing";
import { ColunasKanbanComponent } from "../../components/colunasKanban/colunasKanban.component";
import { AppLayoutModule } from "../../layout/app.layout.module";

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
    AppLayoutModule
  ],
  providers: [],
})
export class KanbanModule { }
