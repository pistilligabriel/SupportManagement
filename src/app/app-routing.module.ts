import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AppLayoutComponent } from './layout/app.layout.component';

const routes: Routes = [
  {
    path:'',component: AppLayoutComponent,
    children: [
      {path:'', redirectTo:'home', pathMatch:'full'}
    ]
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'kanban',
    loadChildren:() => import('./pages/kanban/kanban.module').then(m => m.KanbanModule)
  },
  {
   path: 'controle/geral',
   loadChildren:() => import('./pages/chamados/chamados.module').then(m => m.ChamadosModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
