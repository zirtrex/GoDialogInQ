import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-usuario-registro-form',
  templateUrl: './usuario_registro_form.component.html',
  styleUrls: []
})
export class UsuarioRegistroFormComponent implements OnInit {

  params: any;
  action: number;
  textForm: string;
  usuario: Usuario;
  usuarioForm: FormGroup;

  constructor(
    private usuarioService:UsuarioService,
    private router:Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.usuario = new Usuario();
    this.usuarioForm = this.fb.group({
      nombres: [this.usuario.nombres, Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z ]*$"), 
        Validators.minLength(2), 
        Validators.maxLength(200)] 
      )],
      correo: [this.usuario.correo, Validators.compose([
        Validators.required, 
        Validators.email, 
        Validators.minLength(5), 
        Validators.maxLength(50)] 
      )],
      clave: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)]
      )],
    });
  }

  crear(usuario){
    console.log(usuario);
    this.usuarioService.crear(usuario)
      .subscribe(
        response => {
            console.log(response);
            this.snackBar.open(response.message, null, {
              duration: 10000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['text-success']
            });
            
            this.router.navigate(['/dashboard']);
            
        },
        error => {
          console.log(<any> error);
          this.snackBar.open(error.message, null, {
            duration: 10000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['text-danger']
          });
        }
      )
  }

}
