import { Component, OnInit, OnDestroy, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject  } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ExporterService } from '../../services/exporter.service';
import { RequisitoService } from '../../services/requisito.service';

import { Requisito } from '../../models/requisito';

import { RequisitoFormComponent } from '../requisito/requisito_form/requisito_form.component';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort  } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-requisito',
  templateUrl: './requisito.component.html',
  styleUrls: ["./requisito.component.scss"]
})
export class RequisitoComponent implements OnInit, OnDestroy  {

  destroy$: Subject<boolean> = new Subject<boolean>();
  params: any;
  idTipoPrestamo: any;
  requisito: Requisito = new Requisito();
  requisitos = [];

  displayedColumns: string[] = ['idRequisito', 'descripcionRequisito', 'idTipoPrestamo', 'nombreTipoPrestamo', 'acciones'];
  dataSource: MatTableDataSource<Object>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  keyPressed: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private requisitoService:RequisitoService,
    public dialog:MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private exporter: ExporterService
  ) {}

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.idTipoPrestamo = params['idTipoPrestamo']);
    if (this.idTipoPrestamo == null) {
      this.router.navigate(['/dashboard/tipo_prestamo']);
    } else {
      this.requisito.idTipoPrestamo = this.idTipoPrestamo;
      this.getData();
    }    
  }

  getData() {
    //var result;
    this.requisitoService.getAllByIdTipoPrestamo(this.idTipoPrestamo).pipe(takeUntil(this.destroy$)).subscribe(
      (res) => {
        console.log(res);
        this.requisitos = res.result;
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
        console.error(error);
        this.requisitos = error.result;
        this.dataSource = new MatTableDataSource(error.result); 
        this.dataSource.sort = this.sort;
        this.paginator._intl.firstPageLabel = 'Primera página';
        this.paginator._intl.itemsPerPageLabel = 'Productos por página';
        this.paginator._intl.lastPageLabel = 'Última página';
        this.paginator._intl.nextPageLabel = 'Siguiente';
        this.paginator._intl.previousPageLabel = 'Anterior';
        this.dataSource.paginator = this.paginator;        
        this.changeDetectorRefs.detectChanges();
      }
    );   
      
  }

  filterApply() {
    this.dataSource.filter = this.keyPressed.trim().toLowerCase();
  }

  searchClean(){
    this.keyPressed = "";
    this.filterApply();
  }

  create(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "auto";
    dialogConfig.data = {action: 0, idTipoPrestamo: this.idTipoPrestamo};
    this.dialog.open(RequisitoFormComponent, dialogConfig)
      .afterClosed().subscribe(result => this.getData());
  }

  edit(requisito){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "auto";
    dialogConfig.data = {action: 1, idTipoPrestamo: this.idTipoPrestamo, requisito};
    this.dialog.open(RequisitoFormComponent, dialogConfig)
      .afterClosed().subscribe(result => this.getData());
  }

  delete(requisito){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "auto";
    dialogConfig.data = {action: 2, idTipoPrestamo: this.idTipoPrestamo, requisito};
    this.dialog.open(RequisitoFormComponent, dialogConfig)
      .afterClosed().subscribe(result => this.getData());
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  exportarAExcel(){
    this.exporter.exportToExcel(this.dataSource.filteredData, 'requisito')
  }
  
}
