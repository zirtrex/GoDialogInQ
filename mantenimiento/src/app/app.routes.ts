import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { TipoPrestamoComponent } from './tipo_prestamo/tipo_prestamo.component';
import { CrearTipoPrestamoComponent } from './tipo_prestamo/crear-tipo_prestamo/crear-tipo_prestamo.component';
import { EditarTipoPrestamoComponent } from './tipo_prestamo/editar-tipo_prestamo/editar-tipo_prestamo.component';
import { EliminarTipoPrestamoComponent } from './tipo_prestamo/eliminar-tipo_prestamo/eliminar-tipo_prestamo.component';

const appRoutes: Routes = [
  /*{path: '', redirectTo: '/productos', pathMatch: 'full'},*/
  {path: '', component: InicioComponent},
  {path: 'tipo_prestamo', component: TipoPrestamoComponent},
  {path: 'tipo_prestamo/create', component: CrearTipoPrestamoComponent},
  {path: 'tipo_prestamo/edit/:idProducto', component: EditarTipoPrestamoComponent},
  {path: 'tipo_prestamo/delete/:idProducto', component: EliminarTipoPrestamoComponent},
  /*{path: 'ventas', component: VentaComponent},
  {path: 'ventas/create/:idProducto', component: CrearVentaComponent},
  {path: 'ventas/edit/:idVentas', component: EditarVentaComponent},
  {path: 'ventas/delete/:idVentas', component: EliminarVentaComponent},
  {path: 'producciones', component: ProduccionComponent},
  {path: 'producciones/create/:idProducto', component: CrearProduccionComponent},
  {path: 'producciones/edit/:idProduccion', component: EditarProduccionComponent},*/
];

export const routes:ModuleWithProviders = RouterModule.forRoot(appRoutes);
