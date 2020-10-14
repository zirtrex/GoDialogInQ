import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from '../models/venta';
import { VentaService } from '../services/venta.service';
import { EditarVentaComponent } from './editar-venta/editar-venta.component';
import { EliminarVentaComponent } from './eliminar-venta/eliminar-venta.component';
import { ExporterService } from '../services/exporter.service';
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog,
  MatDialogConfig,
  MatSnackBar
} from '@angular/material';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: []
})
export class VentaComponent implements OnInit {

  //ventas: Observable<Venta[]>;

  displayedColumns: string[] = ['idVentas', 'comprador', 'cantidad', 'fechaVenta', 'tipoPago', 'precioUnitario', 'precioTotal', 'observaciones', 'producto', 'acciones'];
  dataSource: MatTableDataSource<Venta>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  teclaPresionada: string;

  constructor(
    private ventaService:VentaService,
    public dialog:MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private exporter: ExporterService
  ) { }

  ngOnInit() {
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.ventaService.getVentas().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.paginator._intl.firstPageLabel = 'Primera página';
        this.paginator._intl.itemsPerPageLabel = 'Ventas por página';
        this.paginator._intl.lastPageLabel = 'Última página';
        this.paginator._intl.nextPageLabel = 'Siguiente';
        this.paginator._intl.previousPageLabel = 'Anterior';
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data: any, filter) => {
          const dataStr =JSON.stringify(data).toLowerCase();
          return dataStr.indexOf(filter) != -1;
        }
        this.changeDetectorRefs.detectChanges();
        //console.log(this.dataSource);
      }
    );
  }

  aplicarFiltro() {
    this.dataSource.filter = this.teclaPresionada.trim().toLowerCase();
  }

  limpiarBusqueda(){
    this.teclaPresionada = "";
    this.aplicarFiltro();
  }

  editarVenta(venta){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "auto";
    dialogConfig.maxHeight= "90vh";
    dialogConfig.data = venta;
    this.dialog.open(EditarVentaComponent, dialogConfig)
      .afterClosed().subscribe(result => this.obtenerDatos());
  }

  eliminarVenta(venta){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "auto";
    dialogConfig.data = venta;
    this.dialog.open(EliminarVentaComponent, dialogConfig)
      .afterClosed().subscribe(result => this.obtenerDatos());
  }

  exportarAExcel(){
    this.exporter.exportToExcel(this.dataSource.filteredData, 'ventas')
  }

}
