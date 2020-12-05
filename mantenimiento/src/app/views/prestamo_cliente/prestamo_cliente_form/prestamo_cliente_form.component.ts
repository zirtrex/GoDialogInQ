import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MensajeClienteService } from '../../../services/mensaje_cliente.service';
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
    private mensajeClienteService:MensajeClienteService,
    private router:Router,
    public dialogRef: MatDialogRef<PrestamoClienteFormComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    console.log(data);
    this.prestamoCliente = data.prestamoCliente;
    this.textForm = data.prestamoCliente.cliente;    
  }

  ngOnInit() {

    this.mensajeForm = this.fb.group({
      idPrestamoCliente: [this.prestamoCliente.idPrestamoCliente, Validators.compose([
        Validators.required
      ])],
      mensaje: [this.mensaje, Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9. ]*$"),
      ])]
    });
   
  }
 
  enviarMensaje(mensajeCliente) {

    this.mensajeClienteService.add(mensajeCliente).subscribe(
      response => {
        console.log(response);
        this.snackBar.open("Mensaje enviado con éxito", null, {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['text-success']
        });
        if(!response.error){
            this.closeDialog();
        }
      },
      error => { 
        console.log(<any> error)
        this.snackBar.open(error.message, null, {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['text-warning']
        });    
        this.closeDialog();
      }
    ) 

  }

  closeDialog(){
    this.dialogRef.close();
  }

}
