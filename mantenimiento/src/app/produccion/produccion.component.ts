import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Produccion } from '../models/produccion';
import { ProduccionService } from '../services/produccion.service';
import { EditarProduccionComponent } from './editar-produccion/editar-produccion.component';
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
  selector: 'app-produccion',
  templateUrl: './produccion.component.html',
  styles: []
})
export class ProduccionComponent implements OnInit {

  //producciones: Observable<Produccion[]>;

  displayedColumns: string[] = ['idProduccion', 'trabajador', 'cantidad', 'fechaProduccion', 'observaciones', 'producto', 'acciones'];
  dataSource: MatTableDataSource<Produccion>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  teclaPresionada: string;

  constructor(
    private produccionService:ProduccionService,
    public dialog:MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private exporter: ExporterService
  ) { }

  ngOnInit() {
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.produccionService.getProducciones().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.paginator._intl.firstPageLabel = 'Primera página';
        this.paginator._intl.itemsPerPageLabel = 'Producciones por página';
        this.paginator._intl.lastPageLabel = 'Última página';
        this.paginator._intl.nextPageLabel = 'Siguiente';
        this.paginator._intl.previousPageLabel = 'Anterior';
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data: any, filter) => {
          const dataStr =JSON.stringify(data).toLowerCase();
          return dataStr.indexOf(filter) != -1;
        }
        this.changeDetectorRefs.detectChanges();
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

  editarProduccion(produccion){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "auto";
    dialogConfig.maxHeight= "90vh";
    dialogConfig.data = produccion;
    this.dialog.open(EditarProduccionComponent, dialogConfig)
      .afterClosed().subscribe(result => this.obtenerDatos());
  }

  exportarAExcel(){
    this.exporter.exportToExcel(this.dataSource.filteredData, 'ventas')
  }

}
