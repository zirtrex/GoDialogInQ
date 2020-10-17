import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente_form.component.html',
  styleUrls: []
})
export class ClienteFormComponent implements OnInit {

  idCliente: any;
  params: any;
  action: number;
  textForm: string;
  cliente: Cliente;

  constructor(
    private clienteService:ClienteService,
    private router:Router,
    public dialogRef: MatDialogRef<ClienteFormComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private snackBar: MatSnackBar,
  ) {
    if (data.action == 0) {
      this.cliente = new Cliente();
      this.action = data.action;
    } else {
      this.cliente = data.cliente;
      this.action = data.action;
    }
  }

  ngOnInit() {

    if (this.action == 0) {
      this.textForm = "Crear";
    } else if (this.action == 1){
      this.textForm = "Editar";
    } else {
      this.textForm = "Eliminar";
    }
   
  }

  getAction(cliente){
    if (this.action == 0) {
      this.add(cliente);
    } else if (this.action == 1){
      this.edit(cliente);
    } else {
      this.delete(cliente);
    }
  }

  add(cliente){
    this.clienteService.add(cliente)
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
              //this.router.navigate(['/productos']);
              this.closeDialog();
            }
        },
        error => console.log(<any> error)
      )
  }

  edit(cliente){
    this.clienteService.edit(cliente)
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
              //this.router.navigate(['/productos']);
              this.closeDialog();
          }
        },
        error => console.log(<any> error)
      )
  }

  delete(cliente){
    this.clienteService.delete(cliente)
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
              this.closeDialog();
            }
        },
        error => console.log(<any> error)
      )
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
