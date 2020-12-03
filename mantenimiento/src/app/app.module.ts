import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routes';

import { TipoPrestamoService } from './services/tipo_prestamo.service';
import { RequisitoService } from './services/requisito.service';
import { ClienteService } from './services/cliente.service';

import { PrestamoClienteService } from './services/prestamo_cliente.service';

/*import { ExporterService } from './services/exporter.service';*/

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar.component';
import { InicioComponent } from './inicio/inicio.component';

import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioLoginFormComponent } from './usuario/usuario_login_form.component';
import { UsuarioRegistroFormComponent } from './usuario/usuario_registro_form.component';

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
import { UsuarioService } from './services/usuario.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    UsuarioComponent,
    UsuarioLoginFormComponent,
    UsuarioRegistroFormComponent,
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
    AppRoutingModule,
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
    PrestamoClienteService,
    UsuarioService
     /*ExporterService*/
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    UsuarioLoginFormComponent,
    UsuarioRegistroFormComponent,
    TipoPrestamoFormComponent,
    RequisitoFormComponent,
    ClienteFormComponent,
    PrestamoClienteFormComponent    
  ]
})
export class AppModule { }
