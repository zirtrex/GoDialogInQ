import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { VentaService } from '../../services/venta.service';
import { ProductoService } from '../../services/tipo_prestamo.service';
import { Venta } from '../../models/venta';
import { Producto } from '../../models/tipo_prestamo';
import { CheckCantidad } from '../../validators/check-cantidad.validator';

@Component({
  selector: 'app-crear-venta',
  templateUrl: './crear-venta.component.html',
  styleUrls: []
})
export class CrearVentaComponent implements OnInit, OnDestroy {

  crearVentaForm: FormGroup;
  idProducto: any;
  nombreProducto: any;
  params: any;

  venta = new Venta();

  maxVenta = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private router:Router,
              public fb: FormBuilder,
              private ventaService:VentaService,
              private productoService:ProductoService
  ) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.idProducto = params['idProducto']);
    this.venta.idProducto = this.idProducto;
    this.productoService.obtenerProducto(this.idProducto)
      .subscribe(
          response => {
            console.log(response);
            this.maxVenta = response.stock;
            this.nombreProducto = response.nombreProducto;
            (<FormControl>this.crearVentaForm.controls['idProducto'])
                    .setValue(this.idProducto, { onlySelf: true });

            (<FormControl>this.crearVentaForm.controls['cantidadMaxima'])
                    .setValue(this.maxVenta, { onlySelf: true });
          }
      );

    this.crearVentaForm = this.fb.group({
        idProducto: ['', Validators.required],
        comprador: [''],
        cantidad: ['', Validators.required],
        cantidadMaxima: ['' , Validators.required],
        fechaVenta: ['', Validators.required],
        tipoPago: ['', Validators.required],
        precioUnitario: ['', Validators.required],
        observaciones: ['']
    },
    {
        //validator: CheckCantidad('cantidad', 'cantidadMaxima')
    });
  }

  get f() {
    return this.crearVentaForm.controls;
  }

  ngOnDestroy(){
    this.params.unsubscribe();
  }

  crearVenta(venta){
    if (this.crearVentaForm.valid)
    {
      var venta = this.crearVentaForm.value;
      console.log(venta);
      this.ventaService.agregarVenta(venta)
        .subscribe(
          response => {
            console.log(response);
            alert(response.message);
            if(!response.error){
              this.router.navigate(['/ventas']);
            }
          },
          error => console.log(<any> error)
        );
    }
  }
}
