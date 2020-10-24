import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { RequisitoService } from '../../services/requisito.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Requisito } from '../../models/requisito';

@Component({
  selector: 'app-requisito-form',
  templateUrl: './requisito_form.component.html',
  styleUrls: []
})
export class RequisitoFormComponent implements OnInit {

  idRequisito: any;
  idTipoPrestamo: any;
  params: any;
  action: number;
  textForm: string;
  requisito: Requisito;

  constructor(
    private requisitoService:RequisitoService,
    private router:Router,
    public dialogRef: MatDialogRef<RequisitoFormComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private snackBar: MatSnackBar,
  ) {
    if (data.action == 0) {      
      this.action = data.action;
      this.idTipoPrestamo = data.idTipoPrestamo;
      this.requisito = new Requisito();
    } else {
      this.action = data.action;
      this.idTipoPrestamo = data.idTipoPrestamo;
      this.requisito = data.requisito;      
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

  getAction(requisito){
    requisito.idTipoPrestamo = this.idTipoPrestamo;
    if (this.action == 0) {
      this.create(requisito);
    } else if (this.action == 1){
      this.update(requisito);
    } else {
      this.delete(requisito);
    }
  }

  create (requisito){
    this.requisitoService.create(requisito)
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

        //error => console.log(<any> error)
        error => {
          console.log(error);
          var result = error.result;
          console.log(result);
          if (typeof result === 'object') {
            this.snackBar.open("El requisito ingresado por tipo de prestamo ya existe", null, {
              duration: 10000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['text-warning']
            }); 
          }          
        }

      )
  }

  update (requisito){
    this.requisitoService.update(requisito)
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

  delete (requisito){
    this.requisitoService.delete(requisito.idRequisito)
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
