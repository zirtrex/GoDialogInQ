import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app.routes';

import { UsuarioService } from './services/usuario.service';
import { TipoPrestamoService } from './services/tipo_prestamo.service';
import { RequisitoService } from './services/requisito.service';
import { ClienteService } from './services/cliente.service';
import { PrestamoClienteService } from './services/prestamo_cliente.service';
import { ExporterService } from './services/exporter.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar.component';
import { InicioComponent } from './views/inicio/inicio.component';

import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioLoginFormComponent } from './usuario/usuario_login_form.component';
import { UsuarioRegistroFormComponent } from './usuario/usuario_registro_form.component';

import { TipoPrestamoComponent } from './views/tipo_prestamo/tipo_prestamo.component';
import { TipoPrestamoFormComponent } from './views/tipo_prestamo/tipo_prestamo_form/tipo_prestamo_form.component';

import { RequisitoComponent } from './views/requisito/requisito.component';
import { RequisitoFormComponent } from './views/requisito/requisito_form/requisito_form.component';

import { ClienteComponent } from './views/cliente/cliente.component';
import { ClienteFormComponent } from './views/cliente/cliente_form/cliente_form.component';

import { PrestamoClienteComponent } from './views/prestamo_cliente/prestamo_cliente.component';
import { PrestamoClienteFormComponent } from './views/prestamo_cliente/prestamo_cliente_form/prestamo_cliente_form.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

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
    PrestamoClienteFormComponent,
    ...APP_CONTAINERS,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    ChartsModule
  ],
  providers: [
    TipoPrestamoService,
    RequisitoService,
    ClienteService,
    PrestamoClienteService,
    UsuarioService,
    ExporterService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    UsuarioLoginFormComponent,
    UsuarioRegistroFormComponent,
    TipoPrestamoFormComponent,
    RequisitoFormComponent,
    ClienteFormComponent,
    PrestamoClienteFormComponent    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
