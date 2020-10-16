import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Requisito } from '../models/requisito';
import { RequisitoService } from '../services/requisito.service';
import { RequisitoFormComponent } from '../requisito/requisito_form/requisito_form.component';

import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog,
  MatDialogConfig,
  MatSnackBar
} from '@angular/material';

@Component({
  selector: 'app-requisito',
  templateUrl: './requisito.component.html',
  styleUrls: []
})
export class RequisitoComponent implements OnInit {

  params: any;
  idTipoPrestamo: any;
  requisito: Requisito = new Requisito();

  displayedColumns: string[] = ['idRequisito', 'descripcionRequisito', 'estado', 'idTipoPrestamo', 'acciones'];
  dataSource: MatTableDataSource<Requisito>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  keyPressed: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private requisitoService:RequisitoService,
    public dialog:MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.idTipoPrestamo = params['idTipoPrestamo']);
    this.requisito.idTipoPrestamo = this.idTipoPrestamo;
    this.getData();
  }

  getData() {
    this.requisitoService.getAllByIdTipoPrestamo(this.idTipoPrestamo).subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.paginator._intl.firstPageLabel = 'Primera página';
        this.paginator._intl.itemsPerPageLabel = 'Productos por página';
        this.paginator._intl.lastPageLabel = 'Última página';
        this.paginator._intl.nextPageLabel = 'Siguiente';
        this.paginator._intl.previousPageLabel = 'Anterior';
        this.dataSource.paginator = this.paginator;
        this.changeDetectorRefs.detectChanges();
        //console.log(this.dataSource);
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
}
