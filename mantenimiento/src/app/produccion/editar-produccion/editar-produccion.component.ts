import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduccionService } from '../../services/produccion.service';
import { ProductoService } from '../../services/tipo_prestamo.service';
import { Produccion } from '../../models/produccion';
import { Producto } from '../../models/tipo_prestamo';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatSnackBar
} from "@angular/material";

@Component({
  selector: 'app-editar-produccion',
  templateUrl: './editar-produccion.component.html',
  styles: []
})
export class EditarProduccionComponent implements OnInit {

  produccion: Produccion;
  nombreProducto: any;
  maxVenta = 0;

  constructor(
    private produccionService:ProduccionService,
    private productoService:ProductoService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private dialogRef: MatDialogRef<EditarProduccionComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private snackBar: MatSnackBar,
  ) {
    this.produccion = data;
  }

  ngOnInit() {
    this.productoService.obtenerProducto(this.produccion.idProducto.toString()).subscribe(
      response => {
        console.log(response);
        this.maxVenta = response.stock;
        this.nombreProducto = response.nombreProducto;
      }
    );

    this.produccionService.obtenerProduccion(this.produccion.idProduccion.toString()).subscribe(
      data => {
        console.log(data);
        this.produccion.idProduccion = data['idProduccion'];
        this.produccion.trabajador = data['trabajador'];
        this.produccion.cantidad = data['cantidad'];
        this.produccion.fechaProduccion = data['fechaProduccion'];
        this.produccion.observaciones = data['observaciones'];
        this.produccion.idProducto = data['idProducto'];
        this.produccion.producto = data['producto'];
      },
      error => console.log(<any> error)
    );
  }

  editarProduccion(produccion){
    this.produccionService.editarProduccion(produccion)
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
    this.dialogRef.close(this.produccion);
  }

}
