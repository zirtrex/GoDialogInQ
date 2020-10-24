import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routes } from './app.routes';

import { TipoPrestamoService } from './services/tipo_prestamo.service';
import { RequisitoService } from './services/requisito.service';
import { ClienteService } from './services/cliente.service';

import { PrestamoClienteService } from './services/prestamo_cliente.service';

/*import { ExporterService } from './services/exporter.service';*/

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar.component';
import { InicioComponent } from './inicio/inicio.component';

import { TipoPrestamoComponent } from './tipo_prestamo/tipo_prestamo.component';
import { TipoPrestamoFormComponent } from './tipo_prestamo/tipo_prestamo_form/tipo_prestamo_form.component';

import { RequisitoComponent } from './requisito/requisito.component';
import { RequisitoFormComponent } from './requisito/requisito_form/requisito_form.component';

import { ClienteComponent } from './cliente/cliente.component';
import { ClienteFormComponent } from './cliente/cliente_form/cliente_form.component';

import { PrestamoClienteComponent } from './prestamo_cliente/prestamo_cliente.component';
import { PrestamoClienteFormComponent } from './prestamo_cliente/prestamo_cliente_form/prestamo_cliente_form.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    TipoPrestamoComponent,
    TipoPrestamoFormComponent,
    RequisitoComponent,
    RequisitoFormComponent,
    ClienteComponent,
    ClienteFormComponent,
    PrestamoClienteComponent,
    PrestamoClienteFormComponent
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
    RequisitoService,
    ClienteService,
    PrestamoClienteService

     /*ExporterService*/
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    TipoPrestamoFormComponent,
    RequisitoFormComponent,
    ClienteFormComponent
  ]
})
export class AppModule { }
