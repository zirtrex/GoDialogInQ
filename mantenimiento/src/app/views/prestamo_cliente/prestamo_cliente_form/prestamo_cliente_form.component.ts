import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
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
  public mensaje: string = "";
  mensajeForm: FormGroup;

  constructor(
    private prestamoClienteService:PrestamoClienteService,
    private router:Router,
    public dialogRef: MatDialogRef<PrestamoClienteFormComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    console.log(data);
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
      this.textForm = this.prestamoCliente.cliente;
    } else {
      this.textForm = "Eliminar";
    }

    this.mensajeForm = this.fb.group({
      mensaje: [this.mensaje, Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9. ]*$"),
      ])]
    });
   
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
 
  enviarMensaje(mensaje){
    
    this.snackBar.open("Mensaje enviado con éxito", null, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['text-success']
    });    
    this.closeDialog();

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
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
