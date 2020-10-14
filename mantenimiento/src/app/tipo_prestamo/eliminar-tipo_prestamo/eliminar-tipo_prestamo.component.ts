import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoPrestamoService } from '../../services/tipo_prestamo.service';
import { TipoPrestamo } from '../../models/tipo_prestamo';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatSnackBar
} from "@angular/material";

@Component({
  selector: 'app-eliminar-tipo_prestamo',
  templateUrl: './eliminar-tipo_prestamo.component.html',
  styleUrls: []
})
export class EliminarTipoPrestamoComponent implements OnInit, OnDestroy {

  idTipoPrestamo: any;
  params: any;

  tipoPrestamo = new TipoPrestamo(0, '', 0);

  constructor(
    private tipoPrestamoService:TipoPrestamoService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private dialogRef: MatDialogRef<EliminarTipoPrestamoComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private snackBar: MatSnackBar,
  ) {
    this.tipoPrestamo = data;
  }

  ngOnInit() {
    //this.params = this.activatedRoute.params.subscribe(params => this.idProducto = params['idProducto']);
    this.tipoPrestamoService.get(this.tipoPrestamo.idTipoPrestamo.toString())
      .subscribe(
        data => {
          console.log(data);
          this.tipoPrestamo.idTipoPrestamo = data['idTipoPrestamo'];
          this.tipoPrestamo.nombreTipoPrestamo = data['nombreTipoPrestamo'];
          this.tipoPrestamo.estado = data['estado'];
        },
        error => {
          console.log(<any> error);
          this.cerrarDialog();
        }
      );
  }

  ngOnDestroy(){
    //this.params.unsubscribe();
  }

  eliminarProducto(tipoPrestamo){
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
              this.cerrarDialog();
            }
        },
        error => console.log(<any> error)
      )
  }

  cerrarDialog(){
    this.dialogRef.close(this.tipoPrestamo);
  }
}
