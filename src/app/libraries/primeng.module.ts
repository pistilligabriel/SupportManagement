import { NgModule } from "@angular/core";
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { Menu, MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { Ripple, RippleModule } from "primeng/ripple";
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import {  TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [],
  imports: [
    BadgeModule,
    AvatarGroupModule,
    AvatarModule,
    MenuModule,
    ToastModule,
    ButtonModule,
    TieredMenuModule,
    RippleModule,
    CardModule,
    TableModule,
    CheckboxModule,
    MultiSelectModule,
    TagModule,
    ToolbarModule,
    TabViewModule,
    DropdownModule
  ],
  exports: [
    BadgeModule,
    AvatarGroupModule,
    AvatarModule,
    MenuModule,
    ToastModule,
    ButtonModule,
    TieredMenuModule,
    RippleModule,
    CardModule,
    TableModule,
    CheckboxModule,
    MultiSelectModule,
    TagModule,
    ToolbarModule,
    TabViewModule,
    DropdownModule
    ],

})
export class PrimengModule { }
