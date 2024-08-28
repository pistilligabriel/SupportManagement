import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
        {
          label:'Configuração',
          icon:'pi pi-fw pi-cog',
        },
        {
          separator:true
        },
        {
          label: 'Sair',
          icon: 'pi pi-fw pi-sign-out'
        }
    ];
}


}
