import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VentaService } from '../../services/venta.service';
import { ProductoService } from '../../services/tipo_prestamo.service';
import { Venta } from '../../models/venta';
import { Producto } from '../../models/tipo_prestamo';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatSnackBar
} from "@angular/material";

@Component({
  selector: 'app-editar-venta',
  templateUrl: './editar-venta.component.html',
  styleUrls: []
})
export class EditarVentaComponent implements OnInit {

  venta :Venta;
  nombreProducto: any;
  maxVenta = 0;

  constructor(
    private ventaService:VentaService,
    private productoService:ProductoService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private dialogRef: MatDialogRef<EditarVentaComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private snackBar: MatSnackBar,
  ) {
    this.venta = data;
  }

  ngOnInit() {
    this.productoService.obtenerProducto(this.venta.idProducto.toString()).subscribe(
      response => {
        console.log(response);
        this.maxVenta = response.stock;
        this.nombreProducto = response.nombreProducto;
      }
    );

    this.ventaService.obtenerVenta(this.venta.idVentas.toString()).subscribe(
      response => {
        //console.log(data);
        this.venta.idVentas = response['idVentas'];
        this.venta.comprador = response['comprador'];
        this.venta.cantidad = response['cantidad'];
        this.venta.fechaVenta = response['fechaVenta'];
        this.venta.tipoPago = response['tipoPago'];
        this.venta.precioUnitario = response['precioUnitario'];
        this.venta.precioTotal = response['precioTotal'];
        this.venta.observaciones = response['observaciones'];
        this.venta.idProducto = response['idProducto'];
        this.venta.producto = response['producto'];
      },
      error => console.log(<any> error)
    );
  }

  editarVenta(venta){ console.log(venta);
    this.ventaService.editarVenta(venta)
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
    this.dialogRef.close(this.venta);
  }

}
