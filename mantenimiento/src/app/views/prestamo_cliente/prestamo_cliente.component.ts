import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PrestamoCliente } from '../../models/prestamo_cliente';
import { PrestamoClienteService } from '../../services/prestamo_cliente.service';
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

  params: any;
  idCliente: any;
  //displayedColumns: string[] = ['idPrestamoCliente', 'montoNecesitado', 'tiempoNegocio', 'ingresosAnuales', 'puntajeCredito', 'queNegocioTiene', 'comoVaUsar', 'acciones'];
  displayedColumns: string[] = ['idPrestamoCliente', 'nombreTipoPrestamo', 'cliente', 'montoNecesitado', 'tiempoNegocio', 'ingresosAnuales', 'puntajeCredito', 'queNegocioTiene', 'comoVaUsar', 'cuanRapidoNecesita', 'calificacion'];
  
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
    private snackBar: MatSnackBar
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
    this.prestamoClienteService.getAllByIdCliente(idCliente).subscribe(
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
    this.prestamoClienteService.getAll().subscribe(
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


  filterApply() {
    this.dataSource.filter = this.keyPressed.trim().toLowerCase();
  }

  searchClean(){
    this.keyPressed = "";
    this.filterApply();
  }
/* 
  create(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "auto";
    dialogConfig.data = {action: 0};
    this.dialog.open(PrestamoClienteFormComponent, dialogConfig)
      .afterClosed().subscribe(result => this.getData());
  }

  edit(cliente){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "auto";
    dialogConfig.data = {action: 1, cliente};
    this.dialog.open(PrestamoClienteFormComponent, dialogConfig)
      .afterClosed().subscribe(result => this.getData());
  }

  delete(cliente){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "auto";
    dialogConfig.data = {action: 2, cliente};
    this.dialog.open(PrestamoClienteFormComponent, dialogConfig)
      .afterClosed().subscribe(result => this.getData());
  } */

}
