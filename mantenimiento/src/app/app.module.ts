import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routes } from './app.routes';

import { ProductoService } from './services/tipo_prestamo.service';
import { VentaService } from './services/venta.service';
import { ProduccionService } from './services/produccion.service';
import { ExporterService } from './services/exporter.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProductoComponent } from './producto/producto.component';
import { CrearProductoComponent } from './producto/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './producto/editar-producto/editar-producto.component';
import { EliminarProductoComponent } from './producto/eliminar-producto/eliminar-producto.component';
import { VentaComponent } from './venta/venta.component';
import { CrearVentaComponent } from './venta/crear-venta/crear-venta.component';
import { EditarVentaComponent } from './venta/editar-venta/editar-venta.component';
import { EliminarVentaComponent } from './venta/eliminar-venta/eliminar-venta.component';
import { ProduccionComponent } from './produccion/produccion.component';
import { CrearProduccionComponent } from './produccion/crear-produccion/crear-produccion.component';
import { EditarProduccionComponent } from './produccion/editar-produccion/editar-produccion.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    ProductoComponent,
    CrearProductoComponent,
    EditarProductoComponent,
    EliminarProductoComponent,
    VentaComponent,
    CrearVentaComponent,
    EditarVentaComponent,
    EliminarVentaComponent,
    ProduccionComponent,
    CrearProduccionComponent,
    EditarProduccionComponent
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
    ProductoService,
    VentaService,
    ProduccionService,
    ExporterService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CrearProductoComponent,
    EditarProductoComponent,
    EliminarProductoComponent,
    EditarVentaComponent,
    EliminarVentaComponent,
    EditarProduccionComponent
  ]
})
export class AppModule { }
