import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { TipoPrestamoComponent } from './tipo_prestamo/tipo_prestamo.component';
import { TipoPrestamoFormComponent } from './tipo_prestamo/tipo_prestamo_form/tipo_prestamo_form.component';

const appRoutes: Routes = [
  /*{path: '', redirectTo: '/productos', pathMatch: 'full'},*/
  {path: '', component: InicioComponent},
  {path: 'tipo_prestamo', component: TipoPrestamoComponent},
  {path: 'tipo_prestamo/create', component: TipoPrestamoFormComponent},
  {path: 'tipo_prestamo/edit/:idProducto', component: TipoPrestamoFormComponent},
  /*{path: 'ventas', component: VentaComponent},
  {path: 'ventas/create/:idProducto', component: CrearVentaComponent},
  {path: 'ventas/edit/:idVentas', component: EditarVentaComponent},
  {path: 'ventas/delete/:idVentas', component: EliminarVentaComponent},
  {path: 'producciones', component: ProduccionComponent},
  {path: 'producciones/create/:idProducto', component: CrearProduccionComponent},
  {path: 'producciones/edit/:idProduccion', component: EditarProduccionComponent},*/
];

export const routes:ModuleWithProviders = RouterModule.forRoot(appRoutes);
