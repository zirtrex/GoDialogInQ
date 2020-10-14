import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoPrestamoService } from '../../services/tipo_prestamo.service';
import { TipoPrestamo } from '../../models/tipo_prestamo';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatSnackBar
} from "@angular/material";

@Component({
  selector: 'app-editar-tipo_prestamo',
  templateUrl: './editar-tipo_prestamo.component.html',
  styleUrls: []
})
export class EditarTipoPrestamoComponent implements OnInit, OnDestroy {

  idTipoPrestamo: any;
  params: any;

  tipoPrestamo = new TipoPrestamo(0, "", 0);

  constructor(
    private tipoPrestamoService:TipoPrestamoService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private dialogRef: MatDialogRef<EditarTipoPrestamoComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private snackBar: MatSnackBar,
  ) {
    this.tipoPrestamo = data;
  }

  ngOnInit() {
    //this.params = this.activatedRoute.params.subscribe(params => this.idProducto = params['idProducto']);
    this.tipoPrestamoService.get(this.idTipoPrestamo.toString()).subscribe(
      data => {
        console.log(data);
        this.tipoPrestamo.idTipoPrestamo = data['idTipoPrestamo'];
        this.tipoPrestamo.nombreTipoPrestamo = data['nombreTipoPrestamo'];
        this.tipoPrestamo.estado = data['estado'];
      },
      error => console.log(<any> error)
    );
  }

  ngOnDestroy(){
    //this.params.unsubscribe();
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

  closeDialog(){
    this.dialogRef.close(this.tipoPrestamo);
  }
}
