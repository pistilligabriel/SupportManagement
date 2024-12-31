import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Controle',
                items: [
                    { label: 'KanBan', icon: 'pi pi-fw pi-objects-column', routerLink: ['/controle/kanban'] },
                    { label: 'Geral', icon: 'pi pi-fw pi-list-check', routerLink: ['/controle/geral'] },
                    { label: 'Status', icon: 'pi pi-fw pi-sliders-v', routerLink: ['/controle/status'] },
                    { label: 'Classificação', icon: 'pi pi-fw pi-sitemap', routerLink: ['/controle/classificacao'] },
                ]
            },
            {
                label: 'Clientes',
                items: [
                    { label: 'Clientes', icon: 'pi pi-fw pi-user', routerLink: ['/clientes']},
                ]
            },
            {
                label: 'Utilidades',
                items: [
                    { label: 'Novo Módulo', icon: 'pi pi-fw pi-desktop', routerLink: ['/utilidades/novoModulo'] },
                    { label: 'Nova Ação', icon: 'pi pi-fw pi-check-circle', routerLInk: ['/utilidades/novaAcao'] },
                ]
            }
        ];
    }
}
