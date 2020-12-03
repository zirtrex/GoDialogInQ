import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-usuario-login-form',
  templateUrl: './usuario_login_form.component.html',
  styleUrls: []
})
export class UsuarioLoginFormComponent implements OnInit {

  params: any;
  action: number;
  textForm: string;
  usuario: Usuario;

  constructor(
    private usuarioService:UsuarioService,
    private router:Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {}

  getAction(usuario){}

  crear(usario){
    this.usuarioService.crear(usario)
      .subscribe(
        response => {
            console.log(response);
            this.snackBar.open(response.message, null, {
              duration: 10000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['text-warning']
            });
            if(!response.error){
              this.router.navigate(['/inicio']);
            }
        },
        error => console.log(<any> error)
      )
  }

  login(usario){
    this.usuarioService.login(usario)
      .subscribe(
        response => {
          console.log(response);
          this.snackBar.open(response.message, null, {
            duration: 10000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['text-warning']
          });
          if(!response.error){
              this.router.navigate(['/inicio']);
          }
        },
        error => console.log(<any> error)
      )
  }

}
