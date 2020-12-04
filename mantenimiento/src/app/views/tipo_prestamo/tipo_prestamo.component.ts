import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoPrestamo } from '../../models/tipo_prestamo';
import { TipoPrestamoService } from '../../services/tipo_prestamo.service';
import { TipoPrestamoFormComponent } from '../tipo_prestamo/tipo_prestamo_form/tipo_prestamo_form.component';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort  } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tipo_prestamo',
  templateUrl: './tipo_prestamo.component.html',
  styleUrls: []
})
export class TipoPrestamoComponent implements OnInit {

  displayedColumns: string[] = ['idTipoPrestamo', 'nombreTipoPrestamo', 'descripcionTipoPrestamo', 'acciones'];
  dataSource: MatTableDataSource<TipoPrestamo>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  keyPressed: string;

  constructor(
    private tipoPrestamoService:TipoPrestamoService,
    public dialog:MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getData();
  }

  /* getData() {
    this.tipoPrestamoService.getAll().subscribe(
      object => {
        this.dataSource = new MatTableDataSource(object.result);
        this.dataSource.sort = this.sort;
        this.paginator._intl.firstPageLabel = 'Primera página';
        this.paginator._intl.itemsPerPageLabel = 'Elementos por página';
        this.paginator._intl.lastPageLabel = 'Última página';
        this.paginator._intl.nextPageLabel = 'Siguiente';
        this.paginator._intl.previousPageLabel = 'Anterior';
        this.dataSource.paginator = this.paginator;
        this.changeDetectorRefs.detectChanges();
        //console.log(this.dataSource);
      }
    );
  } */

  getData() {
    this.tipoPrestamoService.getAll().subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource(res.result);
        this.dataSource.sort = this.sort;
        this.paginator._intl.firstPageLabel = 'Primera página';
        this.paginator._intl.itemsPerPageLabel = 'Elementos por página';
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
        this.paginator._intl.itemsPerPageLabel = 'Elementos por página';
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
    dialogConfig.data = {action: 0};
    this.dialog.open(TipoPrestamoFormComponent, dialogConfig)
      .afterClosed().subscribe(result => this.getData());
  }

  edit(tipoPrestamo){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "auto";
    dialogConfig.data = {action: 1, tipoPrestamo};
    this.dialog.open(TipoPrestamoFormComponent, dialogConfig)
      .afterClosed().subscribe(result => this.getData());
  }

  delete(tipoPrestamo){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "auto";
    dialogConfig.data = {action: 2, tipoPrestamo};
    this.dialog.open(TipoPrestamoFormComponent, dialogConfig)
      .afterClosed().subscribe(result => this.getData());
  }
}
