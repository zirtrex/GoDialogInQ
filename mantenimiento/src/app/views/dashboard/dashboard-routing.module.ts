import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';

import { DashboardComponent } from './dashboard.component';
import { TipoPrestamoComponent } from '../tipo_prestamo/tipo_prestamo.component';
import { RequisitoComponent } from '../requisito/requisito.component';
import { ClienteComponent } from '../cliente/cliente.component';
import { PrestamoClienteComponent } from '../prestamo_cliente/prestamo_cliente.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Dashboard'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'tipo_prestamo',
    component: TipoPrestamoComponent,
    data: {
      title: 'Tipos de Préstamo'
    },
    canActivate: [AuthGuard]
  },
  {path: 'requisito', component: RequisitoComponent, canActivate: [AuthGuard]},
  {path: 'requisito/:idTipoPrestamo', component: RequisitoComponent, canActivate: [AuthGuard]},
  {path: 'cliente', component: ClienteComponent, canActivate: [AuthGuard]},  
  {path: 'prestamo_cliente', component: PrestamoClienteComponent, canActivate: [AuthGuard]},
  {path: 'prestamo_cliente/cliente/:idCliente', component: PrestamoClienteComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
