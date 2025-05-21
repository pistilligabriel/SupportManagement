import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ConfigService } from '../services/config/config.service';
import { Observable } from 'rxjs';
import { Config } from '../model/interfaces/Config';
import { Usuario } from '../model/interfaces/Usuario';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Tipo } from '../model/enums/Tipo.enum';
import { ChamadosComponent } from '../pages/chamados/chamados.component';
import { EventosCompartilhadosService } from '../services/eventos-compartilhados.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

    logo!: string
    nomeEmpresa!: string

    usuario!: Usuario;
    tipo = Tipo;

    infoConfig!: Config

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        private configService: ConfigService,
        public layoutService: LayoutService,
        private router: Router,
        private usuarioService: UsuarioService,
        private eventos:EventosCompartilhadosService
    ) { }

    ngOnInit(): void {
        this.obterInformacoes();
        this.getNomeEmpresa();

        this.usuarioService.getUsuarioLogado().subscribe({
            next: (usuario) => {
                this.usuario = usuario
            },
            error: (err) => {
                console.log('Não foi possível obter usuario logado', err)
            }
        }
        )
    }

    config() {
        this.router.navigate(['/configuracoes']);
    }
    
    return = '/home'

    logout() {
        sessionStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    getNomeEmpresa() {
        this.configService.getConfig().subscribe(config => {
            this.nomeEmpresa = config.nomeEmpresa;
        });
    }

    obterInformacoes(): void {
        this.configService.getLogo().subscribe(blob => {
            console.log('Blob recebido:', blob);
            const reader = new FileReader();
            reader.onload = () => {
                this.logo = reader.result as string;
            };
            reader.readAsDataURL(blob);
        }, error => {
            console.error('Erro ao carregar logo', error);
            this.logo = 'assets/default-logo.png';
        });
    }

    newChamado(){
        console.log('acao')
        if(this.router.url !== '/chamados'){
            this.router.navigate(['/chamados']).then( () => {

                setTimeout(() => {
                    this.eventos.emitirEvento('novoChamado')
                },1)
            })
        }else{
        this.eventos.emitirEvento('novoChamado')
        }
        console.log('evento emitido')
    }
   
}
