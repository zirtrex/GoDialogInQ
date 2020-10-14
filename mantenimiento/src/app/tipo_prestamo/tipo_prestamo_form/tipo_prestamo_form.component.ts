import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { TipoPrestamoService } from '../../services/tipo_prestamo.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { TipoPrestamo } from '../../models/tipo_prestamo';

@Component({
  selector: 'app-crear-tipo_prestamo',
  templateUrl: './tipo_prestamo_form.component.html',
  styleUrls: []
})
export class TipoPrestamoFormComponent implements OnInit {

  idTipoPrestamo: any;
  params: any;
  action: number;
  textForm: string;
  tipoPrestamo: TipoPrestamo;

  constructor(
    private tipoPrestamoService:TipoPrestamoService,
    private router:Router,
    public dialogRef: MatDialogRef<TipoPrestamoFormComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private snackBar: MatSnackBar,
  ) {
    if (data.action == 0) {
      this.tipoPrestamo = new TipoPrestamo(0, "", 0);
      this.action = data.action;
    } else {
      this.tipoPrestamo = data.tipoPrestamo;
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

    /*this.tipoPrestamoService.get(this.idTipoPrestamo.toString()).subscribe(
      data => {
        console.log(data);
        this.tipoPrestamo.idTipoPrestamo = data['idTipoPrestamo'];
        this.tipoPrestamo.nombreTipoPrestamo = data['nombreTipoPrestamo'];
        this.tipoPrestamo.estado = data['estado'];
      },
      error => console.log(<any> error)
    );*/
  }

  actionTipoPrestamo(tipoPrestamo){
    if (this.tipoPrestamo.idTipoPrestamo == 0) {
      this.addTipoPrestamo(tipoPrestamo);
    } else if (this.action == 1){
      this.editTipoPrestamo(tipoPrestamo);
    } else {
      this.eliminarTipoPrestamo(tipoPrestamo);
    }
  }

  addTipoPrestamo(tipoPrestamo){
    this.tipoPrestamoService.add(tipoPrestamo)
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

  editTipoPrestamo(tipoPrestamo){
    this.tipoPrestamoService.edit(tipoPrestamo)
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

  eliminarTipoPrestamo(tipoPrestamo){
    this.tipoPrestamoService.delete(tipoPrestamo)
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
