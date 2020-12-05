import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ExporterService } from '../../services/exporter.service';
import { PrestamoClienteService } from '../../services/prestamo_cliente.service';

import { PrestamoCliente } from '../../models/prestamo_cliente';
import { PrestamoClienteFormComponent } from '../prestamo_cliente/prestamo_cliente_form/prestamo_cliente_form.component';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort  } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-prestamo_cliente',
  templateUrl: './prestamo_cliente.component.html',
  styleUrls: []
})
export class PrestamoClienteComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  params: any;
  idCliente: any;
  displayedColumns: string[] = ['idPrestamoCliente', 'nombreTipoPrestamo', 'cliente', 'montoNecesitado', 'tiempoNegocio', 'ingresosAnuales', 'puntajeCredito', 'queNegocioTiene', 'comoVaUsar', 'cuanRapidoNecesita', 'calificacion', 'acciones'];
  
  dataSource: MatTableDataSource<PrestamoCliente>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  keyPressed: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private prestamoClienteService:PrestamoClienteService,
    public dialog:MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private exporter: ExporterService
  ) {}
 
  ngOnInit() {
  
    this.params = this.activatedRoute.params.subscribe(params => this.idCliente = params['idCliente']);
    if (this.idCliente == null) {
      this.getData(); 
    } else {
      this.getAllDataByIdCliente(this.idCliente); 
    }    
  }
  
  getAllDataByIdCliente(idCliente) {
    this.prestamoClienteService.getAllByIdCliente(idCliente).pipe(takeUntil(this.destroy$)).subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource(res.result);
        this.dataSource.sort = this.sort;
        this.paginator._intl.firstPageLabel = 'Primera página';
        this.paginator._intl.itemsPerPageLabel = 'Productos por página';
        this.paginator._intl.lastPageLabel = 'Última página';
        this.paginator._intl.nextPageLabel = 'Siguiente';
        this.paginator._intl.previousPageLabel = 'Anterior';
        this.dataSource.paginator = this.paginator;
        this.changeDetectorRefs.detectChanges();
      },
      (error) => {
        this.dataSource = new MatTableDataSource(error.result);
        this.dataSource.sort = this.sort;
        this.paginator._intl.firstPageLabel = 'Primera página';
        this.paginator._intl.itemsPerPageLabel = 'Productos por página';
        this.paginator._intl.lastPageLabel = 'Última página';
        this.paginator._intl.nextPageLabel = 'Siguiente';
        this.paginator._intl.previousPageLabel = 'Anterior';
        this.dataSource.paginator = this.paginator;
        this.changeDetectorRefs.detectChanges();
      },

    );
  }

  getData() {
    this.prestamoClienteService.getAll().pipe(takeUntil(this.destroy$)).subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource(res.result);
        this.dataSource.sort = this.sort;
        this.paginator._intl.firstPageLabel = 'Primera página';
        this.paginator._intl.itemsPerPageLabel = 'Productos por página';
        this.paginator._intl.lastPageLabel = 'Última página';
        this.paginator._intl.nextPageLabel = 'Siguiente';
        this.paginator._intl.previousPageLabel = 'Anterior';
        this.dataSource.paginator = this.paginator;
        this.changeDetectorRefs.detectChanges();
      },
      (error) => {
        this.dataSource = new MatTableDataSource(error.result);
        this.dataSource.sort = this.sort;
        this.paginator._intl.firstPageLabel = 'Primera página';
        this.paginator._intl.itemsPerPageLabel = 'Productos por página';
        this.paginator._intl.lastPageLabel = 'Última página';
        this.paginator._intl.nextPageLabel = 'Siguiente';
        this.paginator._intl.previousPageLabel = 'Anterior';
        this.dataSource.paginator = this.paginator;
        this.changeDetectorRefs.detectChanges();
      },

    );
  }

  enviarMensaje(prestamoCliente) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "auto";
    dialogConfig.data = {action: 1, prestamoCliente};
    this.dialog.open(PrestamoClienteFormComponent, dialogConfig)
      .afterClosed().subscribe(result => this.getData());
  }

  filterApply() {
    this.dataSource.filter = this.keyPressed.trim().toLowerCase();
  }

  searchClean() {
    this.keyPressed = "";
    this.filterApply();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  exportarAExcel() {
    this.exporter.exportToExcel(this.dataSource.filteredData, 'prestamo_cliente')
  }

}
