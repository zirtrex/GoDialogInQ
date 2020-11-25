import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { TipoPrestamoComponent } from './tipo_prestamo/tipo_prestamo.component';
import { RequisitoComponent } from './requisito/requisito.component';
import { ClienteComponent } from './cliente/cliente.component';

import { PrestamoClienteComponent } from './prestamo_cliente/prestamo_cliente.component';

const appRoutes: Routes = [
  /*{path: '', redirectTo: '/productos', pathMatch: 'full'},*/
  {path: '', component: InicioComponent},
  {path: 'tipo_prestamo', component: TipoPrestamoComponent},
  {path: 'requisito', component: RequisitoComponent},
  {path: 'requisito/:idTipoPrestamo', component: RequisitoComponent},
  {path: 'cliente', component: ClienteComponent},  
  {path: 'prestamo_cliente', component: PrestamoClienteComponent},
  {path: 'prestamo_cliente/cliente/:idCliente', component: PrestamoClienteComponent}
  //{path: 'prestamo_cliente/:idCliente', component: PrestamoClienteComponent}

  //http://localhost:4200/prestamo_cliente/cliente/1

  /*{path: 'ventas/edit/:idVentas', component: EditarVentaComponent},
  {path: 'ventas/delete/:idVentas', component: EliminarVentaComponent},
  {path: 'producciones', component: ProduccionComponent},
  {path: 'producciones/create/:idProducto', component: CrearProduccionComponent},
  {path: 'producciones/edit/:idProduccion', component: EditarProduccionComponent},*/
];

export const routes:ModuleWithProviders = RouterModule.forRoot(appRoutes);
