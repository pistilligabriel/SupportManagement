import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuardService } from './guards/auth-guard.guard';

const routes: Routes = [
  {
    path:'',component: AppLayoutComponent,
    children: [
      {path:'', redirectTo:'login', pathMatch:'full'}
    ]
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate:[AuthGuardService]
  },
  {
   path: 'chamados',
   loadChildren:() => import('./pages/chamados/chamados.module').then(m => m.ChamadosModule),
   canActivate:[AuthGuardService]
  },
  {
   path: 'configuracoes',
   loadChildren:() => import('./pages/configuracoes/configuracoes.module').then(m => m.ConfiguracoesModule),
   canActivate:[AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
