import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { RequisitoService } from '../../services/requisito.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Requisito } from '../../models/requisito';

@Component({
  selector: 'app-crear-requisito',
  templateUrl: './requisito_form.component.html',
  styleUrls: []
})
export class RequisitoFormComponent implements OnInit {

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
      this.requisito = new Requisito(0, "", 0,0,null);
      this.action = data.action;
    } else {
      this.requisito = data.requisito;
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

  getAction(requisito){
    if (this.requisito.idRequisito == 0) {
      this.add(requisito);
    } else if (this.action == 1){
      this.edit(requisito);
    } else {
      this.delete(requisito);
    }
  }

  add(requisito){
    this.requisitoService.add(requisito)
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

  edit(requisito){
    this.requisitoService.edit(requisito)
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

  delete(requisito){
    this.requisitoService.delete(requisito)
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
