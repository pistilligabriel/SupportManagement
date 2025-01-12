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
                    { label: 'Geral', icon: 'pi pi-fw pi-list-check', routerLink: ['/controle/geral'] },
                    { label: 'Status', icon: 'pi pi-fw pi-sliders-v', routerLink: ['/controle/status'] },
                    { label: 'Setores', icon: 'pi-objects-column', routerLink: ['/controle/setor']},
                ]
            },
            {
                label: 'Setores',
                items: [
                    { label: 'Setores', icon: 'pi pi-fw pi-user', routerLink: ['/setores']}
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
