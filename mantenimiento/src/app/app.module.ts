import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routes } from './app.routes';

import { TipoPrestamoService } from './services/tipo_prestamo.service';
/*import { VentaService } from './services/venta.service';
import { ProduccionService } from './services/produccion.service';
import { ExporterService } from './services/exporter.service';*/

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar.component';
import { InicioComponent } from './inicio/inicio.component';
import { TipoPrestamoComponent } from './tipo_prestamo/tipo_prestamo.component';
import { TipoPrestamoFormComponent } from './tipo_prestamo/tipo_prestamo_form/tipo_prestamo_form.component';
import { EliminarTipoPrestamoComponent } from './tipo_prestamo/eliminar-tipo_prestamo/eliminar-tipo_prestamo.component';
/*import { VentaComponent } from './venta/venta.component';
import { CrearVentaComponent } from './venta/crear-venta/crear-venta.component';
import { EditarVentaComponent } from './venta/editar-venta/editar-venta.component';
import { EliminarVentaComponent } from './venta/eliminar-venta/eliminar-venta.component';
import { ProduccionComponent } from './produccion/produccion.component';
import { CrearProduccionComponent } from './produccion/crear-produccion/crear-produccion.component';
import { EditarProduccionComponent } from './produccion/editar-produccion/editar-produccion.component';*/

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    TipoPrestamoComponent,
    TipoPrestamoFormComponent,
    EliminarTipoPrestamoComponent
    /*VentaComponent,
    CrearVentaComponent,
    EditarVentaComponent,
    EliminarVentaComponent,
    ProduccionComponent,
    CrearProduccionComponent,
    EditarProduccionComponent*/
  ],
  imports: [
    BrowserModule,
    routes,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    TipoPrestamoService,
    /*VentaService,
    ProduccionService,
    ExporterService*/
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    TipoPrestamoFormComponent,
    EliminarTipoPrestamoComponent
    /*EditarVentaComponent,
    EliminarVentaComponent,
    EditarProduccionComponent*/
  ]
})
export class AppModule { }
