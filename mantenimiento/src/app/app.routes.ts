import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { UsuarioComponent } from './usuario/usuario.component';
import { DefaultLayoutComponent } from './containers';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'login', component: UsuarioComponent},
  {path: 'login/logout', component: UsuarioComponent},
  {
    path: 'dashboard',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
  {path: '**', component: DefaultLayoutComponent},
  {
    path: 'admin2',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      /* {path: '', component: InicioComponent}, */           
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
