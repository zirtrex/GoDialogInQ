import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VentaService } from '../../services/venta.service';
import { Venta } from '../../models/venta';
import { TipoPrestamo } from '../../models/tipo_prestamo';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatSnackBar
} from "@angular/material";

@Component({
  selector: 'app-eliminar-venta',
  templateUrl: './eliminar-venta.component.html',
  styles: []
})
export class EliminarVentaComponent implements OnInit {

  idVentas: any;
  params: any;
  venta: Venta;
  producto: Producto = new Producto(0, 0, "", 0);

  constructor(
    private ventaService:VentaService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private dialogRef: MatDialogRef<EliminarVentaComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private snackBar: MatSnackBar,
  ) {
    this.venta = data;
  }

  ngOnInit() {
    this.ventaService.obtenerVenta(this.venta.idVentas.toString()).subscribe(
      response => {
        this.venta.idVentas = response['idVentas'];
        this.venta.cantidad = response['cantidad'];
        this.producto = response['producto'];
      },
      error => {
        console.log(<any> error);
      }
    );
  }

  eliminarVenta(idVentas){
    this.ventaService.eliminarVenta(idVentas).subscribe(
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
    this.dialogRef.close(this.venta);
  }
}
