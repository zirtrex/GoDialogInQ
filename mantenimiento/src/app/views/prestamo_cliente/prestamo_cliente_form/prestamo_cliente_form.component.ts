import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PrestamoClienteService } from '../../../services/prestamo_cliente.service';
import { PrestamoCliente } from '../../../models/prestamo_cliente';

@Component({
  selector: 'app-prestamo-cliente-form',
  templateUrl: './prestamo_cliente_form.component.html',
  styleUrls: []
})
export class PrestamoClienteFormComponent implements OnInit {

  idPrestamoCliente: any;
  params: any;
  action: number;
  textForm: string;
  prestamoCliente: PrestamoCliente;

  constructor(
    private prestamoClienteService:PrestamoClienteService,
    private router:Router,
    public dialogRef: MatDialogRef<PrestamoClienteFormComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private snackBar: MatSnackBar,
  ) {
    if (data.action == 0) {
      this.prestamoCliente = new PrestamoCliente();
      this.action = data.action;
    } else {
      this.prestamoCliente = data.prestamoCliente;
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

  getAction(prestamoCliente){
    if (this.action == 0) {
      //this.add(prestamoCliente);
    } else if (this.action == 1){
     // this.edit(prestamoCliente);
    } else {
     // this.delete(prestamoCliente);
    }
  }
/* 
  add(prestamoCliente){
    this.prestamoClienteService.add(prestamoCliente)
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

  edit(prestamoCliente){
    this.prestamoClienteService.edit(prestamoCliente)
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

  delete(prestamoCliente){
    this.prestamoClienteService.delete(prestamoCliente)
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
  } */

  closeDialog(){
    this.dialogRef.close();
  }

}
